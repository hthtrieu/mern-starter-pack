import { JwtPayloadDto } from '../../adapter/dtos/auth/jwt-payload.dto';
import { CreateUserDto } from '../../adapter/dtos/user/create-user.dto';
import { UpdateUserDTO } from '../../adapter/dtos/user/update-user.dto';
import { UserDomain } from '../../domain/user.domain';

export interface UserServiceInterface {
  createUser: (userData: CreateUserDto) => Promise<UserDomain>;

  findUserByUsername: (username: string) => Promise<UserDomain | null>;

  getUserProfileByToken: (user: JwtPayloadDto) => Promise<any>;

  findUserByEmail: (email: string) => Promise<UserDomain | null>;

  findUserById: (id: number) => Promise<UserDomain | null>;

  createUserBySocical: (userData: CreateUserDto) => Promise<UserDomain>;
}
