import { Router } from 'express';
import { makeResponse } from '../../lib';
import { registerValidation } from '../../middlewares';
import { getUser, saveUser } from '../../services';
import { hashPassword } from '../../services/common';

const router = Router();

router.post('/signup',
  registerValidation, async (req, res) => {
    try {
      const userAlreadyExists = await getUser({ email: req.body.email });
      if (userAlreadyExists) {
        return makeResponse(res, 409, false, 'This email already exists');
      }
      const user: any = await saveUser({
        ...req.body,
        password: await hashPassword(req.body.password)
      });

      return makeResponse(res, 200, true, 'signup successful', {
        ...user.toObject(),
        password: undefined
      });
    } catch (error) {
      return makeResponse(res, 400, false, error.message, undefined);
    }
  });

export const userController = router;
