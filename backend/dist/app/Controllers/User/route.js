"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const UserController_1 = __importDefault(require("./UserController"));
router.post('/login', UserController_1.default.login);
router.post('/verify-otp', UserController_1.default.verifyOtp);
router.get('/get-all-users', UserController_1.default.getAllUsers);
router.post('/reset-password', UserController_1.default.forgotPassword);
exports.default = router;
