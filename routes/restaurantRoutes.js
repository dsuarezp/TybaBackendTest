import express from 'express';
const router = express.Router();
import { getRestaurants } from '../controllers/restaurantController.js';
import auth from '../middleware/auth.js';

router.get('/restaurants', auth, getRestaurants);

export default router;
