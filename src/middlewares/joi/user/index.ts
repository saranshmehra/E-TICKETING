import joi from 'joi';
import { makeResponse } from '../../../lib';

export const registerValidation = (req: any, res: any, next: any) => {
  const userSchema = joi.object({
    name: joi.string()
      .required(),
    email: joi.string()
      .email()
      .required(),
    gender: joi.string()
      .valid('MALE', 'FEMALE')
      .required(),
    phone: joi.string()
      .required(),
    password: joi.string()
      .required(),
    age: joi.number()
      .required(),
    role: joi.string()
      .valid('ADMIN', 'CUSTOMER')
      .required(),
    status: joi.string()
      .valid('ACTIVE', 'INACTIVE', 'DELETED')
      .allow('')
  });
  const { error } = userSchema.validate(req.body);
  if (error) {
    return makeResponse(res, 400, false, error.message);
  }
  next();
};

export const loginValidation = (req: any, res: any, next: any) => {
  const loginCredentials = joi.object({
    email: joi.string()
      .required(),
    password: joi.string()
      .required()
  });
  const { error } = loginCredentials.validate(req.body);
  if (error) {
    return makeResponse(res, 400, false, error.message);
  }
  next();
};
