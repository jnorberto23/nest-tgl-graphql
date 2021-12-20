/* eslint-disable prettier/prettier */
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Cart } from '../../modules/cart/entities/cart.entity';


export default class CreateCart implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Cart)
        .values([
          {
            value: 30,
            type: 'normal',
            status: true,
          },
          {
            value: 15,
            type: 'promo',
            status: false,
          },
        ])
        .execute();
  }
}
