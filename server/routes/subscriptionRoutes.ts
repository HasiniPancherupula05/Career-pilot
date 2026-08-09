import { Router } from 'express';
import {
  getAllSubscriptions,
  createSubscription,
  deleteSubscription,
  simulateNotification,
} from '../controllers/subscriptionController';

const router = Router();

router.get('/', getAllSubscriptions);
router.post('/', createSubscription);
router.delete('/:id', deleteSubscription);
router.post('/:id/notify', simulateNotification);

export default router;
