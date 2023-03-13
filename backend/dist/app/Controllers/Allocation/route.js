"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const AllocationController_1 = __importDefault(require("./AllocationController"));
router.get('/getRequestByID/:id', AllocationController_1.default.getRequestByID);
router.get('/getAllRequests', AllocationController_1.default.getAllRequests);
router.post('/addRequest', AllocationController_1.default.createRequest);
router.patch('/editRequest/:id', AllocationController_1.default.editRequest);
router.patch('/updateStatus/:id', AllocationController_1.default.updateStatus);
exports.default = router;
