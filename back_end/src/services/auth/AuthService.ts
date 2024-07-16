import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { Container, Inject, Service } from 'typedi';
import {
  ApiError,
  AuthFailureError,
  BadRequestError,
  ErrorType,
  ForbiddenError,
  InternalError,
  NotFoundError,
} from '@src/core/ApiError';
import {
  FailureMsgResponse,
  FailureResponse,
  InternalErrorResponse,
  SuccessMsgResponse,
  SuccessResponse,
} from '@src/core/ApiResponse';
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  SignInRequestType,
  SignInSuccessResponseType,
  SignUpRequestType,
} from '@src/dto/auth/index';
import { comparePassword } from '@helper/HashingPassword';
import {
  genAccessToken,
  genRefreshToken,
  verifyToken,
} from '@helper/JwtHelper';
import UserRepo from '@repositories/user/UseRepo';
import UserRepoInterface from '@repositories/user/UserRepoInterface';

import AuthServiceInterface from './AuthServiceInterface';

dotenv.config();
@Service()
class AuthService implements AuthServiceInterface {
  private userRepo: UserRepoInterface;
  constructor() {
    this.userRepo = Container.get(UserRepo);
  }

  public sign_in = async (
    data: SignInRequestType,
  ): Promise<SignInSuccessResponseType | null | undefined> => {
    const userData = await this.userRepo.getAllUserInfoBy(
      'username',
      data.username,
    );
    if (userData) {
      if (comparePassword(
        {
          inputPassword:data.password, 
          password:userData.password
        }
        )) {
        const access_token = genAccessToken({
          id: userData.id,
          username: userData.username,
          role: userData.role,
          email: userData.email,
        });
        const refresh_token = genRefreshToken({
          id: userData.id,
          username: userData.username,
          role: userData.role,
          email: userData.email,
        });
        const result = await this.userRepo.storeToken(
          userData.id,
          refresh_token,
        );
        if (result) {
          return {
            access_token,
            refresh_token,
            exprires_access_token: String(process.env.TOKEN_EXPIRE_TIME),
          };
        } else {
          return null;
        }
      } else {
        throw new AuthFailureError('Password is incorrect');
      }
    }
    throw new BadRequestError('Username not found');
  };
  public sign_up = async (data: SignUpRequestType): Promise<any> => {
    const isExistedEmail = await this.userRepo.getUserBy('email', data.email);
    if (isExistedEmail) {
      throw new BadRequestError('Email Existed!');
    }
    const isExistedUsername = await this.userRepo.getUserBy(
      'username',
      data.username,
    );
    if (isExistedUsername) {
      throw new BadRequestError('Username Existed!');
      // return new FailureMsgResponse('Username Existed!').send(res);
    }
    const newUser = await this.userRepo.createUser(data);
    if (!newUser) {
      throw new InternalError('Create User Failed');
      // return new FailureMsgResponse('Create User Failed').send(res);
    } else {
      const userProfile = await this.userRepo.me(newUser.id);
      if (!userProfile) {
        throw new InternalError('Get User Profile Failed');
      }
      return userProfile;
    }
  };

  public get_access_token_by_refresh_token = async (
    refreshToken: string,
  ): Promise<any> => {
    if (!refreshToken) {
      throw new BadRequestError('Refresh Token is required');
    }

    // Check validity with an existing token
    // const isExistingToken = await this.userRepo.getUserBy(
    //   'token',
    //   refreshToken      );
    // console.log("refreshToken",refreshToken)
    // console.log("isExistingToken",isExistingToken)
    // if (isExistingToken) {

    // } else {
    //   throw new AuthFailureError('Invalid Refresh Token');
    // }
    const user = await verifyToken(refreshToken);
    const access_token = genAccessToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    const new_refresh_token = genRefreshToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });
    return { accessToken: access_token, refreshToken: new_refresh_token };
  };

  public me = async (req: any, res: Response): Promise<any> => {
    try {
      const id = req.user.id;
      const user = await this.userRepo.me(String(id));
      if (user) {
        return new SuccessResponse('User Profile', user).send(res);
      }
      return new FailureMsgResponse('User not found').send(res);
    } catch (error) {
      return new InternalErrorResponse('Internal Server Error').send(res);
    }
  };
  public sign_in_success_oauth = async (
    req: Request,
    res: Response,
  ): Promise<any> => {
    try {
      if (req?.user) {
        const { displayName, email } = req?.user as {
          displayName: string;
          email: string;
        };
        const userData = await this.userRepo.getAllUserInfoBy(
          'username',
          displayName,
        );
        if (userData) {
          const access_token = genAccessToken({
            id: userData.id,
            username: userData.username,
            role: userData.role,
          });
          const refresh_token = genRefreshToken({
            id: userData.id,
            username: userData.username,
            role: userData.role,
          });
          await this.userRepo.storeToken(userData.id, refresh_token);
          return new SuccessResponse('Login Success', {
            access_token,
            refresh_token,
            exprires_access_token: '1d',
          }).send(res);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  logout = async (req: any, res: Response): Promise<any> => {
    try {
      const id = req.user.id;
      const user = await this.userRepo.me(String(id));
      if (user) {
        const result = await this.userRepo.storeToken(user.id, '');
        if (result) {
          req.logOut((err: any) => {
            if (err) {
              console.log('err', err);
            }
          });
          return new SuccessMsgResponse('Logout Success').send(res);
        } else {
          return new FailureMsgResponse('Logout Failed').send(res);
        }
      }
      return new FailureMsgResponse('User not found').send(res);
    } catch (error) {
      console.log(error);
      return new InternalErrorResponse('Internal Server Error').send(res);
    }
  };
}

export default AuthService;
