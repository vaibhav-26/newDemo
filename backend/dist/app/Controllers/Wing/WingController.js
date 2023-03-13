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
const Wing_1 = __importDefault(require("../../Models/Wing"));
const addWing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const wing = yield Wing_1.default.create({
            name,
            locationId,
            floorId,
        });
        return res.status(200).json({
            wing,
            meta: {
                msg: messages_1.default.Wing.ADD_WING,
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
const removeWing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        yield Wing_1.default.deleteOne({
            _id: id,
        });
        return res.status(200).json({
            meta: {
                msg: messages_1.default.Wing.DELETE_WING,
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
const addWingSchema = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    locationId: joi_1.default.string().required(),
    floorId: joi_1.default.string().required(),
});
exports.default = {
    addWing,
    removeWing,
};
