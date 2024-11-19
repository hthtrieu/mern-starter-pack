import { Inject, Service } from 'typedi';
import { Repository } from 'typeorm';

import { UserMapper } from '../../../adapter/mappers/user/user.mapper';
import { hasingPassword } from '../../../common/helpers/HashingPassword';
import { UserDomain } from '../../../domain/user.domain';
import { AppDataSource } from '../../database/data-source'; // Đảm bảo AppDataSource đã được export đúng
import { User } from '../../entities/User';
import { UserRepositoryInterface } from './user-repository.interface';

@Service()
export class UserRepository implements UserRepositoryInterface {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = AppDataSource.getRepository(User); // Tạo repository từ DataSource
  }

  public findUserByEmail = async (
    email: string,
  ): Promise<UserDomain | null> => {
    const user = await this.usersRepository.findOneBy({ email: email });
    if (user) return UserMapper.toDomain(user);
    return null;
  };

  public findUserByUsername = async (
    username: string,
  ): Promise<UserDomain | null> => {
    const user = await this.usersRepository.findOneBy({ username: username });
    if (user) return UserMapper.toDomain(user);
    return null;
  };

  public findUserById = async (userId: number): Promise<UserDomain | null> => {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (user) return UserMapper.toDomain(user);
    return null;
  };

  public createUser = async (user: UserDomain): Promise<UserDomain> => {
    const rawUser = UserMapper.toEntity(user);
    const { password, salt } = hasingPassword(String(user.password));
    rawUser.password = password;
    const newEntity = await this.usersRepository.save(
      this.usersRepository.create(rawUser),
    );
    return UserMapper.toDomain(newEntity);
  };
}
