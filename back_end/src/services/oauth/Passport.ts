import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import UserRepo from '@repositories/user/UseRepo';
import UserRepoInterface from '@repositories/user/UserRepoInterface';

dotenv.config();

const userRepo: UserRepoInterface = new UserRepo();
passport.use(
  new GoogleStrategy(
    {
      clientID: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
      callbackURL: '/passport/google/callback',
    },
    async function (
      _accessToken: string,
      _refreshToken: string,
      profile: any,
      done: any,
    ) {
      try {
        const isExist = await userRepo.getUserBy(
          'email',
          profile.emails[0].value,
        );
        if (isExist) {
          return done(null, profile);
        }
        await userRepo.createUser({
          email: profile.emails[0].value,
          username: profile.displayName,
          avatar: profile.photos[0].value,
        });
      } catch (error) {
        console.log(error);
      }

      done(null, profile); //done is callback function
    },
  ),
);

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

export default passport;
