import { Request, Response } from 'express';
import Allocation from '../../Models/Allocation';

// to add request
const createRequest = async (req: Request, res: Response) => {
  try {
    const {
      name,
      location,
      place,
      current_desk,
      new_desk,
      projectName,
      description,
      status,
    } = req.body;

    const newReq = await Allocation.create({
      name,
      location,
      place,
      current_desk,
      new_desk,
      projectName,
      description,
      status,
    });
    return res.status(200).json({
      requestData: newReq,
      message: 'Request added successfully',
    });
  } catch (e) {
    res.status(500).json({
      errors: [
        {
          message: 'Internal Server Error',
        },
      ],
    });
  }
};

// to get all requests with pagination and filter

const getAllRequests = async (req: Request, res: Response) => {
  try {
    const { page, per_page, key }: any = req.query;
    const request = await Allocation.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $lookup: {
          from: 'locations',
          localField: 'locationId',
          foreignField: '_id',
          as: 'location',
        },
      },
      {
        $lookup: {
          from: 'floors',
          localField: 'floorId',
          foreignField: '_id',
          as: 'floor',
        },
      },
      {
        $lookup: {
          from: 'wings',
          localField: 'wingId',
          foreignField: '_id',
          as: 'wing',
        },
      },
      {
        $lookup: {
          from: 'desks',
          localField: 'deskId',
          foreignField: '_id',
          as: 'desk',
        },
      },
      {
        $match: {
          $or: [
            { description: { $regex: key, $options: 'i' } },
            { projectName: { $regex: key, $options: 'i' } },
          ],
        },
      },
      {
        $facet: {
          metadata: [
            { $count: 'total' },
            { $addFields: { page: page, per_page: per_page } },
          ],
          data: [
            { $skip: (page - 1) * parseInt(per_page) },
            { $limit: parseInt(per_page) },
          ],
        },
      },
    ]);
    res.status(200).json(request[0]);
  } catch (e) {
    res.status(404).json({ message: 'Internal server error', error: e });
  }
};

// fitlerAPI
// const filterRequest = async (req:Request , res:Response) =>{
//     try{
//         let data =  await Requests.find({
//             "$or":[
//                 {name:{$regex: req.params.key}},
//                 {location:{$regex: req.params.key}},
//                 {description:{$regex: req.params.key}},
//                 {projectName:{$regex: req.params.key}}
//             ]
//         })
//         res.status(200).json({data:data})
//     }catch(e){
//         res.status(400).json({messaege:"Error in filtering data"})
//     }

// }
// get requet by ID

const getRequestByID = async (req: Request, res: Response) => {
  try {
    const request = await Allocation.findById(req.params.id);
    res.status(200).json({ request: request });
  } catch (e) {
    res.status(404).json({ message: 'Error in getting this Allocations' });
  }
};

// update request

const editRequest = async (req: Request, res: Response) => {
  const id = req.params.id;
  await Allocation.findByIdAndUpdate(id, req.body)
    .then((data: any) => {
      if (!data) {
        res.status(404).send({
          message: 'Request Not Found',
        });
      } else {
        res.send({
          message: 'Request Updated Successfully',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

//approve or reject request

const updateStatus = async (req: Request, res: Response) => {
  const id = req.params.id;
  await Allocation.findByIdAndUpdate(id, req.body)
    .then((data: any) => {
      if (!data) {
        res.status(404).json({
          message: 'Request not Found',
        });
      } else {
        res.json({
          message: 'Request Updated Successfully',
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

export default {
  createRequest,
  getAllRequests,
  getRequestByID,
  editRequest,
  updateStatus,
};
