import express, { Request, Response } from 'express';
import auth from '../../Middleware/auth';
import ProjectController from './ProjectController';
const router = express.Router();

router.post('/project/add', ProjectController.addProject);
router.delete('/project/remove', ProjectController.removeProject);
router.get('/projects', ProjectController.getAllProject);

export default router;
