import { UpdateUserDTO } from '../../dtos/user/update-user.dto';
import { UserDomain } from '../../dtos/user/user.domain';

export interface UserServiceInterface {
  getAllUsers: () => Promise<UserDomain[]>;

  updateUser: (data: UpdateUserDTO) => Promise<UserDomain>;
}
