import jwt from 'jsonwebtoken';
import { Inject, Service } from 'typedi';

import { JwtPayloadDto } from '../../adapter/dtos/auth/jwt-payload.dto';
import { JwtDto } from '../../adapter/dtos/auth/jwt.dto';
import { LoginEmailDto } from '../../adapter/dtos/auth/login-email.dto';
import { RegisterDto } from '../../adapter/dtos/auth/register.dto';
import { CreateUserDto } from '../../adapter/dtos/user/create-user.dto';
import { comparePassword } from '../../common/helpers/HashingPassword';
import {
  AuthFailureError,
  ExistedEmail,
  NoDataFound,
} from '../../common/utils/ApiError';
import { Constants } from '../../common/utils/Constant';
import { UserDomain } from '../../domain/user.domain';
import { UserRepositoryInterface } from '../../infrastructure/repositories/user/user-repository.interface';
import { UserRepository } from '../../infrastructure/repositories/user/user.repository';
import { UserServiceImplement } from '../user/user.service';
import { UserServiceInterface } from '../user/user.service.interface';
import { AuthServiceInterface } from './auth.service.interface';

@Service()
export class AuthServiceImplement implements AuthServiceInterface {
  @Inject(() => UserRepository)
  private userRepo: UserRepositoryInterface;

  @Inject(() => UserServiceImplement)
  private userService: UserServiceInterface;

  loginEmail = async (data: LoginEmailDto): Promise<JwtDto | null> => {
    const user = await this.userRepo.findUserByEmail(data.email);
    if (!user) {
      throw new NoDataFound('Email Not Found');
    }
    if (
      comparePassword({
        inputPassword: data.password,
        password: user.password,
      })
    ) {
      const { accessToken, refreshToken, expireIn } =
        await this.getTokenData(user);
      const jwtDto = new JwtDto();
      jwtDto.accessToken = accessToken;
      jwtDto.refreshToken = refreshToken;
      jwtDto.expireIn = expireIn;
      return jwtDto;
    } else {
      throw new AuthFailureError();
    }
  };

  register = async (data: RegisterDto) => {
    const existedUser = await this.userRepo.findUserByEmail(data.email);
    if (existedUser) {
      throw new ExistedEmail();
    }
    const existedName = await this.userService.findUserByUsername(
      data.username,
    );
    if (existedName) {
      throw new ExistedEmail('Existed Username');
    }
    const createUserDto = new CreateUserDto();
    createUserDto.email = data.email;
    createUserDto.username = data.username;
    createUserDto.password = data.password;
    createUserDto.role = Constants.USER_ROLE.USER;
    const userDomain = await this.userService.createUser(createUserDto);
    const jwtPayload = new JwtPayloadDto();
    jwtPayload.id = userDomain.id;
    jwtPayload.role = userDomain.role;
    jwtPayload.username = userDomain.username;
    const { accessToken, refreshToken, expireIn } =
      await this.getTokenData(jwtPayload);
    const jwtDto = new JwtDto();
    jwtDto.accessToken = accessToken;
    jwtDto.refreshToken = refreshToken;
    jwtDto.expireIn = expireIn;
    return jwtDto;
  };

  me = async (user: JwtPayloadDto): Promise<UserDomain | null> => {
    if (!user?.id) {
      return null;
    }
    const userDomain = await this.userService.findUserById(user.id);
    return userDomain;
  };

  getTokenData = async (user: JwtPayloadDto): Promise<JwtDto> => {
    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      String(process.env.JWT_SECRET),
      {
        expiresIn: String(process.env.REFRESH_TOKEN_EXPIRE_TIME),
        algorithm: 'HS256',
      },
    );
    const refreshToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      String(process.env.JWT_SECRET),
      {
        expiresIn: String(process.env.REFRESH_TOKEN_EXPIRE_TIME),
        algorithm: 'HS256',
      },
    );
    const expireIn = String(process.env.REFRESH_TOKEN_EXPIRE_TIME);
    return { accessToken, refreshToken, expireIn };
  };
}
