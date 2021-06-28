import { Router } from 'express';
import {
  authController,
  ticketController,
  trainController,
  userController
} from '../controllers';
import passport from '../middlewares/passport';

const router = Router();

router.use('/auth', authController);

router.use('/user', userController);

router.use('/train', passport.authenticate('jwt', { session: false }), trainController);

router.use('/ticket', passport.authenticate('jwt', { session: false }), ticketController);

export { router };
