"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Allocation_1 = __importDefault(require("../../Models/Allocation"));
// to add request
const createRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, location, place, current_desk, new_desk, projectName, description, status, } = req.body;
        const newReq = yield Allocation_1.default.create({
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
    }
    catch (e) {
        res.status(500).json({
            errors: [
                {
                    message: 'Internal Server Error',
                },
            ],
        });
    }
});
// to get all requests with pagination and filter
const getAllRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, per_page, key } = req.query;
        const request = yield Allocation_1.default.aggregate([
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
    }
    catch (e) {
        res.status(404).json({ message: 'Internal server error', error: e });
    }
});
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
const getRequestByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield Allocation_1.default.findById(req.params.id);
        res.status(200).json({ request: request });
    }
    catch (e) {
        res.status(404).json({ message: 'Error in getting this Allocations' });
    }
});
// update request
const editRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield Allocation_1.default.findByIdAndUpdate(id, req.body)
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: 'Request Not Found',
            });
        }
        else {
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
});
//approve or reject request
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield Allocation_1.default.findByIdAndUpdate(id, req.body)
        .then((data) => {
        if (!data) {
            res.status(404).json({
                message: 'Request not Found',
            });
        }
        else {
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
});
exports.default = {
    createRequest,
    getAllRequests,
    getRequestByID,
    editRequest,
    updateStatus,
};
