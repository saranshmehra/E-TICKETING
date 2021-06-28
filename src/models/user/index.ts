import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  gender: {
    type: String,
    enum: ['MALE', 'FEMALE'],
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN', 'CUSTOMER'],
    default: 'CUSTOMER'
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE', 'DELETED'],
    default: 'ACTIVE'
  }
}, {
  timestamps: true
});

export const USER = model('user', userSchema);
