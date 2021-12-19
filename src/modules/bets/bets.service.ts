import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBetInput } from './dto/create-bet.input';
import { Bet } from './entities/bet.entity';
import { Game } from '../games/entities/game.entity';

@Injectable()
export class BetsService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,

    @InjectRepository(Bet)
    private betRepository: Repository<Bet>,
  ) {}

  async create(user, bets) {
    let cartPrice = 0;
    for (const i in bets) {
      const game = await this.gameRepository.findOne({ id: bets[i].gameId });
      const numberOutOfRange = bets[i].numbers.some(
        (value: number) => value > game.range,
      );
      const numbersCount = bets[i].numbers.length;
      bets[i].numbers = bets[i].numbers.join('-');
      bets[i].userId = user.id;
      cartPrice += game.price;

      if (game.maxNumber !== numbersCount) {
        throw new BadRequestException({
          errors: {
            message: `A Aposta para o jogo #${game.id} ${game.type} (${bets[i].numbers}) é invalida.`,
            maxNumbers: game.maxNumber,
            selectedNumbers: numbersCount,
          },
        });
      }
      if (numberOutOfRange) {
        throw new BadRequestException({
          errors: {
            message: `A Aposta para o jogo #${game.id} ${game.type} (${bets[i].numbers}) é invalida.`,
            numbersRange: game.range,
          },
        });
      }
    }

    if (cartPrice < 5) {
      throw new BadRequestException(
        'Impossivel salvar aposta, pois o preço total do carrinho é inferior ao preço minimo de aposta',
      );
    }

    const betCreated = await this.betRepository.create(bets);
    const betSaved = await this.betRepository.save(betCreated);

    if (!betSaved)
      throw new InternalServerErrorException(
        'Ocorreu um erro ao salvar a aposta, tente novamente mais tarde',
      );

    return betCreated;
  }

  async findAll() {
    try {
      const bets = await this.betRepository.find({
        relations: ['game'],
      });
      if (!bets.length)
        throw new NotFoundException('Nenhuma aposta foi encontrada.');
      return bets;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async findOne(id: number) {
    try {
      const bet = await this.betRepository.findOne({
        where: { id },
        relations: ['game'],
      });
      if (!bet) throw new NotFoundException('Aposta não encontrada.');
      return bet;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async remove(id: number) {
    const bet = await this.findOne(id);

    const betDeleted = await this.betRepository.delete({ id });

    if (!betDeleted)
      throw new InternalServerErrorException(
        'Ocorreu um erro ao apagar a aposta, tente novamente mais tarde.',
      );

    return bet;
  }
}
