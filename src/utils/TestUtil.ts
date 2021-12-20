/* eslint-disable prettier/prettier */
import { User } from '../modules/users/entities/user.entity';

export default class TestUtil {
  static giveMeAValidUser(): User {
    const user = new User();
    user.firstName = 'João';
    user.email = 'joao.norberto@luby.com';
    user.lastName = 'Norberto';
    user.username = 'jnorberto';
    user.id = '890dd66f-8f66-443b-97bd-9955f2d8e836';
    user.bets = [],
    user.usersRole = []
    return user;
  }
}
