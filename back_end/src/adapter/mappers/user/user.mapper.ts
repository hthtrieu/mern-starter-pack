import { UserDomain } from '../../../domain/user.domain';
import { User } from '../../../infrastructure/entities/User';

export class UserMapper {
  static toDomain(raw: User | any): UserDomain {
    const domainEntity = new UserDomain();
    domainEntity.id = raw.id;
    domainEntity.email = raw.email;
    // domainEntity.password = raw.password;
    domainEntity.username = raw.username;
    domainEntity.role = raw.role;
    return domainEntity;
  }

  static toEntity(domain: UserDomain | any): User {
    const entity = new User();
    entity.id = domain.id;
    entity.email = domain.email;
    entity.username = domain.username;
    entity.password = domain.password;
    entity.role = domain.role;
    return entity;
  }
}
