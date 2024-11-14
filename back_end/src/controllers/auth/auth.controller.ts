import { Request, Response } from 'express';
import { Container, Inject, Service } from 'typedi';

import { UpdateUserDTO } from '../../dtos/user/update-user.dto';
import { UserServiceImplement } from '../../services/user/user.service';
import { UserServiceInterface } from '../../services/user/user.service.interface';

@Service()
export class AuthController {
  // @Inject(() => UserServiceImplement)
  private userService: UserServiceInterface;

  constructor() {
    this.userService = Container.get(UserServiceImplement);
  }

  loginEmail = () => {};

  loginGoogle = () => {};
}
