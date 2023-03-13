"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProjectController_1 = __importDefault(require("./ProjectController"));
const router = express_1.default.Router();
router.post('/project/add', ProjectController_1.default.addProject);
router.delete('/project/remove', ProjectController_1.default.removeProject);
router.get('/projects', ProjectController_1.default.getAllProject);
exports.default = router;
