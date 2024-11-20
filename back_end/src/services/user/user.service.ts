// services/user/UserServiceImplement.ts
import { Container, Inject, Service } from 'typedi';

import { CreateUserDto } from '../..//adapter/dtos/user/create-user.dto';
import { JwtPayloadDto } from '../../adapter/dtos/auth/jwt-payload.dto';
import { UpdateUserDTO } from '../../adapter/dtos/user/update-user.dto';
import { UserMapper } from '../../adapter/mappers/user/user.mapper';
import { Constants } from '../../common/utils/Constant';
import { UserDomain } from '../../domain/user.domain';
import { User } from '../../infrastructure/entities/User';
import { UserRepositoryInterface } from '../../infrastructure/repositories/user/user-repository.interface';
import { UserRepository } from '../../infrastructure/repositories/user/user.repository';
import { UserServiceInterface } from './user.service.interface';

@Service()
export class UserServiceImplement implements UserServiceInterface {
  @Inject(() => UserRepository)
  private userRepo: UserRepositoryInterface;

  findUserByUsername = async (username: string): Promise<UserDomain | null> => {
    const user = await this.userRepo.findUserByUsername(username);
    return user;
  };

  createUser = async (userData: CreateUserDto): Promise<UserDomain> => {
    const domain = new UserDomain();
    domain.email = userData.email;
    domain.username = userData.username;
    domain.password = userData.password;
    const userDomain = await this.userRepo.createUser(userData);
    return userDomain;
  };

  getUserProfileByToken = async (user: JwtPayloadDto): Promise<any> => {
    if (!user?.id) {
      return null;
    }
    const userDomain = await this.userRepo.findUserById(user.id);
    return userDomain;
  };

  findUserByEmail = async (email: string): Promise<UserDomain | null> => {
    const user = await this.userRepo.findUserByEmail(email);
    return user;
  };

  findUserById = async (id: number): Promise<UserDomain | null> => {
    const user = await this.userRepo.findUserById(id);
    return user;
  };

  createUserBySocical = async (
    userData: CreateUserDto,
  ): Promise<UserDomain> => {
    const domain = new UserDomain();
    domain.email = userData.email;
    domain.username = userData.username;
    domain.password = 'random password';
    domain.role = Constants.USER_ROLE.USER;
    const userDomain = await this.userRepo.createUser(userData);
    return userDomain;
  };
}
