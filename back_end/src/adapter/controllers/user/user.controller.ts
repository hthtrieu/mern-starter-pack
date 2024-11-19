import { Request, Response } from 'express';
import { Container, Inject, Service } from 'typedi';

import { JwtPayloadType } from '../../../common/types/JwtPayloadType';
import {
  ApiResponse,
  SuccessResponse,
} from '../../../common/utils/ApiResponse';
import { UserServiceImplement } from '../../../services/user/user.service';
import { UserServiceInterface } from '../../../services/user/user.service.interface';
import { UpdateUserDTO } from '../../dtos/user/update-user.dto';

@Service()
export class UserController {
  @Inject(() => UserServiceImplement)
  private userService: UserServiceInterface;

  // constructor() {
  //   this.userService = Container.get(UserServiceImplement);
  // }

  getAllUsers = async (
    req: Request,
    res: Response,
  ): Promise<Response | ApiResponse> => {
    return new SuccessResponse('Users List', '');
  };

  updateUser = async (req: Request, res: Response): Promise<Response> => {
    return res.json('');
  };

  getUserProfile = async (req: Request, res: Response): Promise<Response> => {
    const user = await this.userService.getUserProfileByToken(
      req?.user as JwtPayloadType,
    );
    return new SuccessResponse('User Profile', user).send(res);
  };
}
