"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Joi = __importStar(require("joi"));
const User_1 = __importDefault(require("../../Models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const messages_1 = __importDefault(require("../../commons/messages"));
const email_1 = __importDefault(require("../../utill/email"));
const messages_2 = __importDefault(require("../../commons/messages"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        let user = yield User_1.default.findOneAndUpdate({ userName }, { otp }, { new: true });
        if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
            yield (0, email_1.default)({
                from: process.env.OTP_EMAIL,
                to: user.email,
                subject: 'V-Desk Login OTP',
                otp,
            }, 'views/otp.ejs');
            return res.status(200).json({
                user,
                meta: {
                    msg: messages_1.default.User.OTP_SENT,
                },
            });
        }
        else {
            return res.status(422).json({
                errors: {
                    msg: messages_2.default.User.INVALID_CREDENTIAL,
                },
            });
        }
    }
    catch (e) {
        res.status(500).json({
            errors: {
                msg: messages_1.default.Common.INTERNAL_SERVER_ERROR,
            },
        });
    }
});
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        let user = yield User_1.default.findOne({
            $or: [{ email: email }, { userName: userName }],
        }).select('+otp');
        if (user && otp == user.otp) {
            return res.status(200).json({
                user,
                token: jsonwebtoken_1.default.sign({ user }, process.env.TOKEN_SECRET, {
                    expiresIn: '1 days',
                }),
                meta: {
                    msg: messages_2.default.User.LOGIN,
                },
            });
        }
        else {
            return res.status(422).json({
                errors: {
                    msg: messages_2.default.User.INVALID_OTP,
                },
            });
        }
    }
    catch (e) {
        res.status(500).json({
            errors: {
                msg: messages_2.default.Common.INTERNAL_SERVER_ERROR,
            },
        });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, per_page, key } = req.query;
        const users = yield User_1.default.aggregate([
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
    }
    catch (error) {
        res.status(500).json({
            errors: [
                {
                    msg: error,
                },
            ],
        });
    }
});
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password, firstName, lastName } = req.body;
        let user = yield User_1.default.findOne({ userName: userName });
        const encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
        if (user) {
            yield User_1.default.updateMany({
                userName: userName,
            }, {
                firstName,
                lastName,
                userName,
                password: encryptedPassword,
            });
        }
        else {
            yield User_1.default.insertMany({
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
    }
    catch (e) {
        res.status(500).json({
            errors: [
                {
                    msg: 'Internal Server Error',
                },
            ],
        });
    }
});
const loginUserSchema = Joi.object().keys({
    userName: Joi.string().required(),
    password: Joi.string().required(),
});
const verifyOtpSchema = Joi.object().keys({
    otp: Joi.number().required(),
});
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);
        const checkuser = yield User_1.default.findOne({ email: req.body.email });
        if (!checkuser)
            return res
                .status(400)
                .send({ message: "user with given email doesn't exist" });
        const otp = Math.floor(100000 + Math.random() * 900000);
        let user = yield User_1.default.findOneAndUpdate({ email: req.body.email }, { otp }, { new: true });
        if (user) {
            yield (0, email_1.default)({
                from: process.env.OTP_EMAIL,
                to: user.email,
                subject: 'V-Desk Login OTP',
                otp,
            }, 'views/otp.ejs');
            return res.status(200).json({
                user,
                meta: {
                    msg: messages_1.default.User.OTP_SENT,
                },
            });
        }
        else {
            return res.status(422).json({
                errors: {
                    msg: messages_2.default.User.INVALID_CREDENTIAL,
                },
            });
        }
    }
    catch (e) {
        res.send('An error occured');
        console.log(e);
    }
});
exports.default = {
    login,
    verifyOtp,
    // add,
    getAllUsers,
    forgotPassword,
};
