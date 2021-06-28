import joi from 'joi';
import { makeResponse } from '../../../lib';

export const bookTicketValidation = (req: any, res: any, next: any) => {
  const ticketSchema = joi.object({
    train: joi.string()
      .hex()
      .required(),
    passengers: joi.number()
      .required(),
    passengerDetails: joi.array()
      .items(joi.object({
        name: joi.string()
          .required(),
        age: joi.number()
          .required(),
        gender: joi.string()
          .valid('MALE', 'FEMALE')
          .required()
      }))
      .required(),
    totalAmount: joi.number()
      .required(),
    status: joi.string()
      .valid('BOOKED', 'CANCELLED')
      .allow('')
  });
  const { error } = ticketSchema.validate(req.body);
  if (error) {
    return makeResponse(res, 400, false, error.message);
  }
  next();
};
