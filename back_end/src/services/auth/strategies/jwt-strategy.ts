import { JwtPayload } from 'jsonwebtoken';
import passport from 'passport';

// import { JwtPayloadDto } from '../../../adapter/dtos/auth/jwt-payload.dto';
import { JwtPayloadType } from '../../../common/types/JwtPayloadType';

const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const JwtStrategyConfig = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  (jwtPayload: JwtPayloadType, done: any) => {
    return done(null, jwtPayload);
  },
);

export default JwtStrategyConfig;
