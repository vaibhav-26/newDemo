import express, { Request, Response } from 'express';
import auth from './Middleware/auth';
const router = express.Router();
import userRoute from './Controllers/User/route';
import AllocationRoute from './Controllers/Allocation/route';
import ProjectRoute from './Controllers/Project/route';

router.use(userRoute);
router.use(AllocationRoute);
router.use(ProjectRoute);

export default router;
