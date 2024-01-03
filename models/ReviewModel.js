import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 4
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const ReviewModel = mongoose.model.Review || mongoose.model('review', ReviewSchema);

export default ReviewModel;
