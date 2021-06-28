import { model, Schema, Types } from 'mongoose';

const passengerSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['MALE', 'FEMALE'],
    required: true
  }
});

const ticketSchema = new Schema({
  train: {
    type: Types.ObjectId,
    required: true,
    ref: 'train'
  },
  passengers: {
    type: Number,
    required: true
  },
  passengerDetails: {
    type: [passengerSchema],
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  bookedBy: {
    type: Types.ObjectId,
    required: true,
    ref: 'user'
  },
  status: {
    type: String,
    enum: ['BOOKED', 'CANCELLED'],
    default: 'BOOKED'
  }
}, { timestamps: true });

export const TICKET = model('ticket', ticketSchema);
