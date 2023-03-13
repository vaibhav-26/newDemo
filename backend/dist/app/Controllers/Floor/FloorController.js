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
const Floor_1 = __importDefault(require("../../Models/Floor"));
const addFloor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const floor = yield Floor_1.default.create({
            name,
            locationId,
        });
        return res.status(200).json({
            floor,
            meta: {
                msg: messages_1.default.Floor.ADD_FLOOR,
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
const removeFloor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        yield Floor_1.default.deleteOne({
            _id: id,
        });
        return res.status(200).json({
            meta: {
                msg: messages_1.default.Floor.DELETE_FLOOR,
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
const addFloorSchema = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    locationId: joi_1.default.string().required(),
});
exports.default = {
    addFloor,
    removeFloor,
};
