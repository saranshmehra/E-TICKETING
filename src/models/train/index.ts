import { model, Schema } from 'mongoose';

const trainSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  fromPlace: {
    type: String,
    required: true,
    lowercase: true
  },
  toPlace: {
    type: String,
    lowercase: true,
    required: true
  },
  ticketPrice: {
    type: Number,
    required: true
  },
  departureTime: {
    type: Date,
    required: true
  },
  arrivalTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
    default: 'ACTIVE'
  }
});

export const TRAIN = model('train', trainSchema);
