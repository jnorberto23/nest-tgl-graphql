/* eslint-disable prettier/prettier */
import { Connection } from 'typeorm';
import { User } from '../../modules/users/entities/user.entity';
import { Factory, Seeder } from 'typeorm-seeding';
import { UsersRole } from '../../modules/users-roles/entities/users-role.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const users = await factory(User)().createMany(2);
    console.log(users);
    if (users) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(UsersRole)
        .values([
          { userId: users[0].id, roleId: 1 },
          { userId: users[1].id, roleId: 2 },
        ])
        .execute();
    }
  }
}
