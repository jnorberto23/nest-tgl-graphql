/* eslint-disable prettier/prettier */
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Role } from '../../modules/roles/entities/role.entity';

export default class CreateRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
      
      await connection
        .createQueryBuilder()
        .insert()
        .into(Role)
        .values([
          { type: 'user' },
          { type: 'admin'},
        ])
        .execute();
    
  }
}
