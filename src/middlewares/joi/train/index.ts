import joi from 'joi';
import { makeResponse } from '../../../lib';

export const addTrainValidation = (req: any, res: any, next: any) => {
  const trainSchema = joi.object({
    name: joi.string()
      .required(),
    fromPlace: joi.string()
      .required(),
    toPlace: joi.string()
      .required(),
    ticketPrice: joi.number()
      .required(),
    departureTime: joi.date()
      .required(),
    arrivalTime: joi.date()
      .required(),
    status: joi.string()
      .valid('ACTIVE', 'INACTIVE')
      .allow('')
  });
  const { error } = trainSchema.validate(req.body);
  if (error) {
    return makeResponse(res, 400, false, error.message);
  }
  next();
};

export const updateTrainValidation = (req: any, res: any, next: any) => {
  const trainSchema = joi.object({
    name: joi.string()
      .allow(''),
    fromPlace: joi.string()
      .allow(''),
    toPlace: joi.string()
      .allow(''),
    ticketPrice: joi.number(),
    departureTime: joi.date(),
    arrivalTime: joi.date(),
    status: joi.string()
      .valid('ACTIVE', 'INACTIVE')
      .allow('')
  });
  const { error } = trainSchema.validate(req.body);
  if (error) {
    return makeResponse(res, 400, false, error.message);
  }
  next();
};
