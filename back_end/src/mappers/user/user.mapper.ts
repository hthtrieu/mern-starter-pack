import { UserDomain } from '../../dtos/user/user.domain';
import { User } from '../../entities/User';

export class UserMapper {
  // ! for test
  static toDomain(raw: User | any): UserDomain {
    const domainEntity = new UserDomain();
    domainEntity.id = raw.id;
    domainEntity.email = raw.email;
    return domainEntity;
  }

  // ! for test
  static toEntity(domain: UserDomain | any): User {
    const entity = new User();
    entity.id = domain.id;
    entity.email = domain.email;
    entity.username = domain.username;
    return entity;
  }
}
