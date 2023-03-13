import { Request, Response } from "express";
import Joi from "joi";
import messages from "../../commons/messages";
import Location from "../../Models/Location";

const addLocation = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const result = addLocationSchema.validate({
      name,
    });

    if (result.error) {
      return res.status(422).json({
        errors: {
          msg: result.error.message,
        },
      });
    }

    const location = await Location.create({
      name,
    });

    return res.status(200).json({
      location,
      meta: {
        msg: messages.Location.ADD_LOCATION,
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

const removeLocation = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    await Location.deleteOne({
      _id: id,
    });

    return res.status(200).json({
      meta: {
        msg: messages.Location.DELETE_LOCATION,
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

const addLocationSchema = Joi.object().keys({
  name: Joi.string().required(),
});

export default {
  addLocation,
  removeLocation,
};
