import { Request, Response } from 'express';
import { Container, Inject, Service } from 'typedi';

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
}
