import express from 'express';
const router = express.Router();
import AllocationController from './AllocationController';

router.get('/getRequestByID/:id', AllocationController.getRequestByID);
router.get('/getAllRequests', AllocationController.getAllRequests);
router.post('/addRequest', AllocationController.createRequest);
router.patch('/editRequest/:id', AllocationController.editRequest);
router.patch('/updateStatus/:id', AllocationController.updateStatus);

export default router;
