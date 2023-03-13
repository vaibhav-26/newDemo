import { Request, Response } from "express";
import Joi from "joi";
import messages from "../../commons/messages";
import Floor from "../../Models/Floor";

const addFloor = async (req: Request, res: Response) => {
  try {
    const { name, locationId } = req.body;

    const result = addFloorSchema.validate({
      name,
      locationId,
    });

    if (result.error) {
      return res.status(422).json({
        errors: {
          msg: result.error.message,
        },
      });
    }

    const floor = await Floor.create({
      name,
      locationId,
    });

    return res.status(200).json({
      floor,
      meta: {
        msg: messages.Floor.ADD_FLOOR,
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

const removeFloor = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    await Floor.deleteOne({
      _id: id,
    });

    return res.status(200).json({
      meta: {
        msg: messages.Floor.DELETE_FLOOR,
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

const addFloorSchema = Joi.object().keys({
  name: Joi.string().required(),
  locationId: Joi.string().required(),
});

export default {
  addFloor,
  removeFloor,
};
