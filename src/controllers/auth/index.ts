import { Router } from 'express';
import { makeResponse } from '../../lib';
import { loginValidation } from '../../middlewares';
import { getUser } from '../../services';
import { assignToken, matchPassword } from '../../services/common';

const router = Router();

router.post('/login',
  loginValidation, async (req, res) => {
    try {
      const user: any = await getUser({ email: req.body.email });
      if (!user) {
        return makeResponse(res, 404, false, 'invalid email or password');
      }
      const passwordCorrect = await matchPassword(req.body.password, user.password);
      if (!passwordCorrect) {
        return makeResponse(res, 400, false, 'invalid email or password');
      }
      const token = assignToken({ name: user.name, email: user.email, role: user.role, _id: user._id },
        String(process.env.JWT_SECRET));

      return makeResponse(res, 200, true, 'Login successful',
        { token, role: user.role });
    } catch (error) {
      return makeResponse(res, 400, false, error.message);
    }
  });

export const authController = router;
