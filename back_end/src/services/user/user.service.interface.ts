import { CreateUserDto } from '../../adapter/dtos/user/create-user.dto';
import { UpdateUserDTO } from '../../adapter/dtos/user/update-user.dto';
import { UserDomain } from '../../domain/user.domain';

export interface UserServiceInterface {
  createUser: (userData: CreateUserDto) => Promise<UserDomain>;

  findUserByUsername: (username: string) => Promise<UserDomain | null>;
}
