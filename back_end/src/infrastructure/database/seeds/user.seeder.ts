import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

import { hasingPassword } from '../../../common/helpers/HashingPassword';
import { Constants } from '../../../common/utils/Constant';
import { User } from '../../entities/User';

export class UserSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const { password } = hasingPassword(String('password'));
    const userData = {
      username: 'admin',
      email: 'admin@email.com',
      password: password,
      createdAt: new Date(),
      createdBy: 'Seeder',
      role: Constants.USER_ROLE.ADMIN,
    };
    const userExists = await userRepository.findOneBy({
      email: userData.email,
    });
    if (!userExists) {
      const newUser = userRepository.create(userData);
      await userRepository.save(newUser);
    }
  }
}
