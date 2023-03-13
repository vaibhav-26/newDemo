import { Request, Response } from "express";
import Joi from "joi";
import messages from "../../commons/messages";
import Wing from "../../Models/Wing";

const addWing = async (req: Request, res: Response) => {
  try {
    const { name, locationId, floorId } = req.body;

    const result = addWingSchema.validate({
      name,
      locationId,
      floorId,
    });

    if (result.error) {
      return res.status(422).json({
        errors: {
          msg: result.error.message,
        },
      });
    }

    const wing = await Wing.create({
      name,
      locationId,
      floorId,
    });

    return res.status(200).json({
      wing,
      meta: {
        msg: messages.Wing.ADD_WING,
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

const removeWing = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    await Wing.deleteOne({
      _id: id,
    });

    return res.status(200).json({
      meta: {
        msg: messages.Wing.DELETE_WING,
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

const addWingSchema = Joi.object().keys({
  name: Joi.string().required(),
  locationId: Joi.string().required(),
  floorId: Joi.string().required(),
});

export default {
  addWing,
  removeWing,
};
