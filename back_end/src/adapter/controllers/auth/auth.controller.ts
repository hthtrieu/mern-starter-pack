import { Request, Response } from 'express';
import { Container, Inject, Service } from 'typedi';

import {
  ApiResponse,
  SuccessResponse,
} from '../../../common/utils/ApiResponse';
import { UserDomain } from '../../../domain/user.domain';
import { AuthServiceImplement } from '../../../services/auth/auth.service';
import { AuthServiceInterface } from '../../../services/auth/auth.service.interface';
import { UserServiceImplement } from '../../../services/user/user.service';
import { UserServiceInterface } from '../../../services/user/user.service.interface';
import { JwtPayloadDto } from '../../dtos/auth/jwt-payload.dto';
import { LoginEmailDto } from '../../dtos/auth/login-email.dto';
import { RegisterDto } from '../../dtos/auth/register.dto';

@Service()
export class AuthController {
  @Inject(() => AuthServiceImplement)
  private authService: AuthServiceInterface;

  // constructor() {
  //   this.authService = Container.get(AuthServiceImplement);
  // }

  loginEmail = async (req: Request, res: Response): Promise<Response> => {
    const jwtDto = await this.authService.loginEmail(
      new LoginEmailDto(req.body.email, req.body.password),
    );

    return new SuccessResponse('login succeed List', jwtDto).send(res);
  };

  register = async (req: Request, res: Response): Promise<Response> => {
    const registerDto = new RegisterDto();
    registerDto.username = req.body.username;
    registerDto.password = req.body.password;
    registerDto.email = req.body.email;
    const jwtResponse = await this.authService.register(registerDto);

    return new SuccessResponse('Register success', jwtResponse).send(res);
  };

  // login-google
  loginGoogle = async (
    req: Request,
    res: Response,
  ): Promise<Response | void> => {
    console.log('user domain after login google: ', req.user as UserDomain);
    if (req?.user) {
      const userDomain = req?.user as UserDomain;
      const jwtPayloadDto = new JwtPayloadDto();
      jwtPayloadDto.id = userDomain.id;
      jwtPayloadDto.role = userDomain.role;
      jwtPayloadDto.username = userDomain.username;

      const { accessToken, refreshToken, expireIn } =
        await this.authService.getTokenData(jwtPayloadDto);
      // return new SuccessResponse('login succeed List', {
      //   accessToken,
      //   refreshToken,
      //   expireIn,
      // }).send(res);

      res.redirect(
        `http://localhost:5173/login-google/success?accessToken=${accessToken}`,
      );
    }
  };
}
