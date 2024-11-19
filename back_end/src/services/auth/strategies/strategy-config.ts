import passport from 'passport';

import { UserServiceImplement } from '../../user/user.service';
import { GoogleStrategyFactory } from './google.strategy';
import JwtStrategyConfig from './jwt-strategy';

passport.use(JwtStrategyConfig);
passport.use(GoogleStrategyFactory());
export default passport;
// Tắt session trong Passport.js
// passport.serializeUser((user: any, done) => done(null, user));
// passport.deserializeUser((user: any, done) => done(null, user));
