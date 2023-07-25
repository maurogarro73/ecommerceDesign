import mongoose, { Schema, model } from 'mongoose';

const schema = new Schema({
  firstName: {
    type: String,
    required: false,
    max: 100,
  },
  lastName: {
    type: String,
    required: false,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    max: 100,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    max: 100,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  age: {
    type: Number,
    required: false,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'carts',
    required: true,
  },
});
export const UserModel = model('users', schema);
