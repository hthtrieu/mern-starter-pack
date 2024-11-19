import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import Container from 'typedi';

import { CreateUserDto } from '../../../adapter/dtos/user/create-user.dto';
import { Constants } from '../../../common/utils/Constant';
import { GoogleConfig } from '../../../config/google.config';
import { UserServiceImplement } from '../../user/user.service';
import { UserServiceInterface } from '../../user/user.service.interface';

export const GoogleStrategyFactory = () => {
  const userService: UserServiceInterface = Container.get(UserServiceImplement);
  return new GoogleStrategy(
    {
      clientID: GoogleConfig.clientId,
      clientSecret: GoogleConfig.clientSecret,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile: any, done) => {
      try {
        // Tìm hoặc tạo người dùng bằng UserService
        let user = await userService.findUserByEmail(
          profile.emails?.[0]?.value,
        );
        if (!user) {
          //    email: profile.emails[0].value,
          //   username: profile.displayName,
          const createUserDto = new CreateUserDto();
          createUserDto.username = profile.displayName;
          createUserDto.role = Constants.USER_ROLE.USER;
          createUserDto.email = profile.emails?.[0]?.value;
          user = await userService.createUserBySocical(createUserDto);
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    },
  );
};
