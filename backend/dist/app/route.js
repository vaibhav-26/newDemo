"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const route_1 = __importDefault(require("./Controllers/User/route"));
const route_2 = __importDefault(require("./Controllers/Allocation/route"));
const route_3 = __importDefault(require("./Controllers/Project/route"));
router.use(route_1.default);
router.use(route_2.default);
router.use(route_3.default);
exports.default = router;
