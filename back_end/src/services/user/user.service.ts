// services/user/UserServiceImplement.ts
import { Container, Service } from 'typedi';

import { UpdateUserDTO } from '../../dtos/user/update-user.dto';
import { UserDomain } from '../../dtos/user/user.domain';
import { User } from '../../entities/User';
import { UserMapper } from '../../mappers/user/user.mapper';
import { UserServiceInterface } from './user.service.interface';

@Service()
export class UserServiceImplement implements UserServiceInterface {
  getAllUsers = async (): Promise<UserDomain[]> => {
    const raw = [
      { id: '1', email: 'abc@gmail.com', name: 'abc' },
      { id: '2', email: 'abc@gmail.com', name: 'xyz' },
    ];
    return raw.map((user) => UserMapper.toDomain(user));
  };

  updateUser = async (data: UpdateUserDTO): Promise<UserDomain> => {
    //! for example
    const raw = UserMapper.toEntity(data);
    // raw.id = '1';
    // raw.username = data.name || '';
    // raw.email = data.email || '';
    return UserMapper.toDomain(raw);
  };
}
