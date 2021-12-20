import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../cart/entities/cart.entity';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async create(createGameInput: CreateGameInput) {
    const typeIsRegistered = await this.gameRepository.findOne({
      where: { type: createGameInput.type },
    });

    if (typeIsRegistered)
      throw new BadRequestException(
        'O type já possui registro na base de dados.',
      );

    const game = await this.gameRepository.create({ ...createGameInput });
    const gameSaved = await this.gameRepository.save(game);

    if (!gameSaved)
      throw new InternalServerErrorException(
        'Ocorreu um erro ao salvar o game, tente novamente mais tarde',
      );

    return game;
  }

  async findAll() {
    const games = await this.gameRepository.find();
    return games;
  }

  async findOne(id: number) {
    const game = await this.gameRepository.findOne({
      where: { id },
    });

    if (!game) throw new NotFoundException('Jogo não encontrado');
    return game;
  }

  async update(id: number, updateGameInput: UpdateGameInput) {
    const game = await this.findOne(id);

    await this.gameRepository.update(game.id, { ...updateGameInput });
    const updateGame = this.gameRepository.create({
      ...game,
      ...updateGameInput,
    });

    if (!updateGame)
      throw new InternalServerErrorException(
        'Ocorreu um erro ao atualizar o jogo, tente novamente mais tarde',
      );

    return updateGame;
  }

  async remove(id: number) {
    const game = await this.findOne(id);

    const gameDeleted = await this.gameRepository.delete({ id });

    if (!gameDeleted)
      throw new InternalServerErrorException(
        'Ocorreu um erro ao apagar o jogo, tente novamente mais tarde.',
      );

    return game;
  }
}
