import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an Email!'],
    unique: [true, 'Email Exist']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password!']
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const UserModel = mongoose.model.User || mongoose.model('user', UserSchema);

export default UserModel;
