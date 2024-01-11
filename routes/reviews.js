import express from 'express';
import { check } from 'express-validator';
import {
  createReview,
  deleteReview,
  getReviews,
  updateReview
} from '../controllers/reviews.js';
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
