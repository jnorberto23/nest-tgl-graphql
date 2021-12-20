/* eslint-disable prettier/prettier */
import { User } from '../../modules/users/entities/user.entity';
import Faker from 'faker'
import { define } from 'typeorm-seeding'

define(User, (faker: typeof Faker) => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const user = new User();
    user.firstName = firstName
    user.lastName = lastName
    user.email = faker.internet.exampleEmail(firstName, lastName).toLowerCase();
    user.username = user.firstName + Math.random().toString().toLowerCase();
    user.password = 'root';
    return user;
});
