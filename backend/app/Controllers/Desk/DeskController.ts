import { Request, Response } from "express";
import Joi from "joi";
import messages from "../../commons/messages";
import Desk from "../../Models/Desk";

const addDesk = async (req: Request, res: Response) => {
  try {
    const { name, locationId, floorId, wingId } = req.body;

    const result = addDeskSchema.validate({
      name,
      locationId,
      floorId,
      wingId,
    });

    if (result.error) {
      return res.status(422).json({
        errors: {
          msg: result.error.message,
        },
      });
    }

    const desk = await Desk.create({
      name,
      locationId,
      floorId,
      wingId,
    });

    return res.status(200).json({
      desk,
      meta: {
        msg: messages.Desk.ADD_DESK,
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

const removeDesk = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    await Desk.deleteOne({
      _id: id,
    });

    return res.status(200).json({
      meta: {
        msg: messages.Desk.DELETE_DESK,
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

const addDeskSchema = Joi.object().keys({
  name: Joi.string().required(),
  locationId: Joi.string().required(),
  floorId: Joi.string().required(),
  wingId: Joi.string().required(),
});

export default {
  addDesk,
  removeDesk,
};
