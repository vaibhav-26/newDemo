import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as Joi from 'joi';
import User from '../../Models/User';
import bcrypt from 'bcryptjs';
import Message from '../../commons/messages';
import sendEmail from '../../utill/email';
import messages from '../../commons/messages';

const login = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;

    const result = loginUserSchema.validate({
      userName,
      password,
    });

    if (result.error) {
      return res.status(422).json({
        errors: {
          msg: result.error.message,
        },
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    let user: any = await User.findOneAndUpdate(
      { userName },
      { otp },
      { new: true }
    );

    if (user && (await bcrypt.compare(password, user.password))) {
      await sendEmail(
        {
          from: process.env.OTP_EMAIL,
          to: user.email,
          subject: 'V-Desk Login OTP',
          otp,
        },
        'views/otp.ejs'
      );

      return res.status(200).json({
        user,
        meta: {
          msg: Message.User.OTP_SENT,
        },
      });
    } else {
      return res.status(422).json({
        errors: {
          msg: messages.User.INVALID_CREDENTIAL,
        },
      });
    }
  } catch (e) {
    res.status(500).json({
      errors: {
        msg: Message.Common.INTERNAL_SERVER_ERROR,
      },
    });
  }
};

const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { userName, otp, email } = req.body;

    const result = verifyOtpSchema.validate({
      otp,
    });

    if (result.error) {
      return res.status(422).json({
        errors: {
          msg: result.error.message,
        },
      });
    }

    let user = await User.findOne({
      $or: [{ email: email }, { userName: userName }],
    }).select('+otp');

    if (user && otp == user.otp) {
      return res.status(200).json({
        user,
        token: jwt.sign({ user }, process.env.TOKEN_SECRET!, {
          expiresIn: '1 days',
        }),
        meta: {
          msg: messages.User.LOGIN,
        },
      });
    } else {
      return res.status(422).json({
        errors: {
          msg: messages.User.INVALID_OTP,
        },
      });
    }
  } catch (e) {
    res.status(500).json({
      errors: {
        msg: messages.Common.INTERNAL_SERVER_ERROR,
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { page, per_page, key }: any = req.query;
    const users = await User.aggregate([
      {
        $match: {
          $or: [
            { firstName: { $regex: key, $options: 'i' } },
            { lastName: { $regex: key, $options: 'i' } },
            { userName: { $regex: key, $options: 'i' } },
            { email: { $regex: key, $options: 'i' } },
            { role: { $regex: key, $options: 'i' } },
          ],
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
    res.status(200).json(users[0]);
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

const add = async (req: Request, res: Response) => {
  try {
    const { userName, password, firstName, lastName } = req.body;

    let user = await User.findOne({ userName: userName });
    const encryptedPassword = await bcrypt.hash(password, 10);
    if (user) {
      await User.updateMany(
        {
          userName: userName,
        },
        {
          firstName,
          lastName,
          userName,
          password: encryptedPassword,
        }
      );
    } else {
      await User.insertMany({
        firstName,
        lastName,
        userName,
        password: encryptedPassword,
      });
    }

    return res.status(200).json({
      user: user,
      meta: {
        msg: 'User Added Successfully.',
      },
    });
  } catch (e) {
    res.status(500).json({
      errors: [
        {
          msg: 'Internal Server Error',
        },
      ],
    });
  }
};

const loginUserSchema = Joi.object().keys({
  userName: Joi.string().required(),
  password: Joi.string().required(),
});

const verifyOtpSchema = Joi.object().keys({
  otp: Joi.number().required(),
});

const forgotPassword = async (req: Request, res: Response, next: any) => {
  try {
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const checkuser = await User.findOne({ email: req.body.email });
    if (!checkuser)
      return res
        .status(400)
        .send({ message: "user with given email doesn't exist" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    let user: any = await User.findOneAndUpdate(
      { email: req.body.email },
      { otp },
      { new: true }
    );
    if (user) {
      await sendEmail(
        {
          from: process.env.OTP_EMAIL,
          to: user.email,
          subject: 'V-Desk Login OTP',
          otp,
        },
        'views/otp.ejs'
      );

      return res.status(200).json({
        user,
        meta: {
          msg: Message.User.OTP_SENT,
        },
      });
    } else {
      return res.status(422).json({
        errors: {
          msg: messages.User.INVALID_CREDENTIAL,
        },
      });
    }
  } catch (e) {
    res.send('An error occured');
    console.log(e);
  }
};

export default {
  login,
  verifyOtp,
  // add,
  getAllUsers,
  forgotPassword,
};
