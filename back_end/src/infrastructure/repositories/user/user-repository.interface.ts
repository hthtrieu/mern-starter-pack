import { UserDomain } from '../../../domain/user.domain';
import { User } from '../../entities/User';

export interface UserRepositoryInterface {
  getUserByEmail(email: string): Promise<UserDomain | null>;

  findUserByUsername: (username: string) => Promise<UserDomain | null>;

  createUser: (
    user: Omit<UserDomain, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ) => Promise<UserDomain>;
}
