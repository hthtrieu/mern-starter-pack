import { Request, Response } from 'express';
import { Container, Inject, Service } from 'typedi';

import { UpdateUserDTO } from '../../dtos/user/update-user.dto';
import { UserServiceImplement } from '../../services/user/user.service';
import { UserServiceInterface } from '../../services/user/user.service.interface';

@Service()
export class UserController {
  // @Inject(() => UserServiceImplement)
  private userService: UserServiceInterface;

  constructor() {
    this.userService = Container.get(UserServiceImplement);
  }

  getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await this.userService.getAllUsers();
    return res.json(users);
  };

  updateUser = async (req: Request, res: Response): Promise<Response> => {
    const users = await this.userService.updateUser(
      new UpdateUserDTO({
        email: 'abc@gmail.com',
        username: 'abc',
      }),
    );
    return res.json(users);
  };
}
