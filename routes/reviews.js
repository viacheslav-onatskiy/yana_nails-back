import express from 'express';
import {
  createReview,
  getReviews,
  updateReview,
  deleteReview
} from '../controllers/reviews.js';
import { check } from 'express-validator';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getReviews);

router.post(
  '/',
  [auth, [check('description', 'Description is required').not().isEmpty()]],
  createReview
);

router.put(
  '/:id',
  [auth, [check('description', 'Description is required').not().isEmpty()]],
  updateReview
);

router.delete('/:id', auth, deleteReview);

export default router;
