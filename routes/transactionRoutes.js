import express from 'express';
const router = express.Router();
import { getTransactions, addTransaction } from '../controllers/transactionController.js';
import auth from '../middleware/auth.js';

router.get('/transactions', auth, getTransactions);
router.post('/transactions', auth, addTransaction);

export default router;
