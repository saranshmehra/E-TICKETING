import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { USER } from '../../models';

const opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = String(process.env.JWT_SECRET);
passport.use(new Strategy(opts, (JWT_PAYLOAD, done) => {
  USER.findOne({_id: JWT_PAYLOAD._id})
    .then((user: any) => {
      if (user) {
        done(undefined, user);
      } else {
        done(undefined, false);
      }
    })
    .catch((err: any) => {
      done(err, false);
    });
}));

export default passport;
