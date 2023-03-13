import { Request, Response } from 'express';
import Joi from 'joi';
import messages from '../../commons/messages';
import Project from '../../Models/Project';

const addProject = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const result = addProjectSchema.validate({
      name,
    });

    if (result.error) {
      return res.status(422).json({
        errors: {
          msg: result.error.message,
        },
      });
    }

    const project = await Project.create({
      name,
    });

    return res.status(200).json({
      project,
      meta: {
        msg: messages.Project.ADD_PROJECT,
      },
    });
  } catch (e) {
    res.status(500).json({
      errors: [
        {
          msg: messages.Common.INTERNAL_SERVER_ERROR,
        },
      ],
    });
  }
};

const removeProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    await Project.deleteOne({
      _id: id,
    });

    return res.status(200).json({
      meta: {
        msg: messages.Project.DELETE_PROJECT,
      },
    });
  } catch (e) {
    res.status(500).json({
      errors: [
        {
          msg: messages.Common.INTERNAL_SERVER_ERROR,
        },
      ],
    });
  }
};

const getAllProject = async (req: Request, res: Response) => {
  try {
    const { page, per_page, key }: any = req.query;
    const projects = await Project.aggregate([
      {
        $match: {
          $or: [{ name: { $regex: key, $options: 'i' } }],
        },
      },
      {
        $facet: {
          metadata: [
            { $count: 'total' },
            {
              $addFields: {
                page: parseInt(page),
                per_page: parseInt(per_page),
              },
            },
          ],
          data: [
            { $skip: (parseInt(page) - 1) * parseInt(per_page) },
            { $limit: parseInt(per_page) },
          ],
        },
      },
    ]);
    res.status(200).json(projects[0]);
  } catch (error) {
    res.status(500).json({
      errors: [
        {
          msg: error,
        },
      ],
    });
  }
};

const addProjectSchema = Joi.object().keys({
  name: Joi.string().required(),
});

export default {
  addProject,
  removeProject,
  getAllProject,
};
