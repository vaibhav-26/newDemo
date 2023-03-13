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
const joi_1 = __importDefault(require("joi"));
const messages_1 = __importDefault(require("../../commons/messages"));
const Project_1 = __importDefault(require("../../Models/Project"));
const addProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const project = yield Project_1.default.create({
            name,
        });
        return res.status(200).json({
            project,
            meta: {
                msg: messages_1.default.Project.ADD_PROJECT,
            },
        });
    }
    catch (e) {
        res.status(500).json({
            errors: [
                {
                    msg: messages_1.default.Common.INTERNAL_SERVER_ERROR,
                },
            ],
        });
    }
});
const removeProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        yield Project_1.default.deleteOne({
            _id: id,
        });
        return res.status(200).json({
            meta: {
                msg: messages_1.default.Project.DELETE_PROJECT,
            },
        });
    }
    catch (e) {
        res.status(500).json({
            errors: [
                {
                    msg: messages_1.default.Common.INTERNAL_SERVER_ERROR,
                },
            ],
        });
    }
});
const getAllProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, per_page, key } = req.query;
        const projects = yield Project_1.default.aggregate([
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
const addProjectSchema = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
});
exports.default = {
    addProject,
    removeProject,
    getAllProject,
};
