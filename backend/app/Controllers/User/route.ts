import express, { Request, Response } from 'express';
import auth from '../../Middleware/auth';
const router = express.Router();
import UserController from './UserController';

router.post('/login', UserController.login);
router.post('/verify-otp', UserController.verifyOtp);
router.get('/get-all-users', UserController.getAllUsers);
router.post('/reset-password', UserController.forgotPassword);

export default router;
