import { NextFunction, Request, Response } from 'express';
import { makeResponse } from '../../lib';

const checkRole = (roles: Array<string>) => async (req: Request, res: Response, next: NextFunction) => {
  const { role } = req.user as any;

  if (!role) {
    return makeResponse(res, 401, false, '');
  }
  if (roles.includes(role)) {
    next();
  } else {
    return makeResponse(res, 403, false, 'you do not have sufficient permissions');
  }
};

export { checkRole };
