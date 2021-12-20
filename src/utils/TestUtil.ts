/* eslint-disable prettier/prettier */
import { Game } from '../modules/games/entities/game.entity';
import { User } from '../modules/users/entities/user.entity';

export default class TestUtil {
  static giveMeAValidUser(): User {
    const user = new User();
    user.firstName = 'João';
    user.email = 'joao.norberto@luby.com';
    user.lastName = 'Norberto';
    user.username = 'jnorberto';
    user.id = '890dd66f-8f66-443b-97bd-9955f2d8e836';
    (user.bets = []), (user.usersRole = []);
    return user;
  }

  static giveMeAValidGame(): Game {
    const game = new Game();
    game.type = 'Lotofacil';
    game.description =
      'Escolha 15 números para apostar na lotofácil. Você ganha acertando 11, 12, 13, 14 ou 15 números. São muitas chances de ganhar, e agora você joga de onde estiver!';
    game.range = 25;
    game.price = 2.5;
    game.maxNumber = 15;
    game.color = '#7F3992';
    return game;
  }
}
