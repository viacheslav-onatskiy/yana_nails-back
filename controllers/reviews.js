import { validationResult } from 'express-validator';
import ReviewModel from '../models/ReviewModel.js';
import UserModel from '../models/userModel.js';

// @route    GET /reviews
// @desc     Get all reviews
// @access   Public
export const getReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find().sort({ date: -1 });
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route    POST /reviews
// @desc     Create a review
// @access   Private
export const createReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await UserModel.findById(req.user.id).select('-password');

    const newReview = new ReviewModel({
      name: user.name,
      description: req.body.description,
      user: req.user.id,
      rating: req.body.rating
    });

    const review = await newReview.save();

    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route    PUT /reviews/:id
// @desc     Update a review
// @access   Private
export const updateReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const review = await ReviewModel.findById(req.params.id);

    // Check for ObjectId format and review
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !review) {
      return res.status(404).json({ msg: 'Review not found' });
    }

    // Check user if the review belongs to authenticated user
    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Update the review
    if (review) {
      review.description = req.body.description;
      review.rating = req.body.rating;
    }

    await review.save();

    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route    DELETE /reviews/:id
// @desc     DELETE review by ID
// @access   Private
export const deleteReview = async (req, res) => {
  try {
    const review = await ReviewModel.findById(req.params.id);
    // Check for ObjectId format and review besides if the review belongs to authenticated user
    if (
      !req.params.id.match(/^[0-9a-fA-F]{24}$/) ||
      !review ||
      review.user.toString() !== req.user.id
    ) {
      return res.status(404).json({ msg: 'Review not found' });
    }
    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
