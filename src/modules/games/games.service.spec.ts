import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from '../../utils/TestUtil';
import { Cart } from '../cart/entities/cart.entity';
import { Game } from './entities/game.entity';
import { GamesService } from './games.service';

describe('GamesService', () => {
  let service: GamesService;
  const mockRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamesService,
        {
          provide: getRepositoryToken(Game),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Cart),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<GamesService>(GamesService);
  });

  beforeEach(async () => {
    mockRepository.findOne.mockReset();
    mockRepository.find.mockReset();
    mockRepository.create.mockReset();
    mockRepository.save.mockReset();
    mockRepository.update.mockReset();
    mockRepository.delete.mockReset();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllgames', () => {
    it('should list all games', async () => {
      const game = TestUtil.giveMeAValidGame();
      mockRepository.find.mockReturnValue([game, game]);
      const games = await service.findAll();
      expect(games).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findGameByid', () => {
    it('should list a game', async () => {
      const game = TestUtil.giveMeAValidGame();
      mockRepository.findOne.mockReturnValue(game);
      const gameFound = await service.findOne(game.id);
      expect(gameFound).toMatchObject({
        type: game.type,
        price: game.price,
        maxNumber: game.maxNumber,
      });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
    it('should return a exception when does not find a game', async () => {
      mockRepository.findOne.mockReturnValue(null);
      expect(service.findOne(3)).rejects.toBeInstanceOf(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('create game', () => {
    it('should create a game', async () => {
      const game = TestUtil.giveMeAValidGame();
      mockRepository.save.mockReturnValue(game);
      mockRepository.create.mockReturnValue(game);
      const savedgame = await service.create(game);
      expect(savedgame).toMatchObject(game);
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    });
    it('should return a exception when type is registered', async () => {
      const game = TestUtil.giveMeAValidGame();
      mockRepository.findOne.mockReturnValue(game);
      await service.create(game).catch((e) => {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e).toMatchObject({
          message: 'O type já possui registro na base de dados.',
        });
      });
    });
    it('should return a exception when doenst create a user', async () => {
      const game = TestUtil.giveMeAValidGame();
      mockRepository.save.mockReturnValue(null);
      mockRepository.create.mockReturnValue(game);
      await service.create(game).catch((e) => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message:
            'Ocorreu um erro ao salvar o game, tente novamente mais tarde',
        });
      });
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    });
  });

  describe('Update game', () => {
    it('should update a game', async () => {
      const game = TestUtil.giveMeAValidGame();
      const updatedGame = { price: 4.5 };
      mockRepository.findOne.mockReturnValue(game);
      mockRepository.update.mockReturnValue({
        ...game,
        ...updatedGame,
      });
      mockRepository.create.mockReturnValue({
        ...game,
        ...updatedGame,
      });
      const resultGame = await service.update(1, {
        ...game,
        price: 4.5,
      });
      expect(resultGame).toMatchObject(updatedGame);
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.findOne).toBeCalledTimes(1);
      expect(mockRepository.update).toBeCalledTimes(1);
    });
    it('should return a exception when doenst update a game', async () => {
      const game = TestUtil.giveMeAValidGame();

      mockRepository.findOne.mockReturnValue(game);
      mockRepository.update.mockReturnValue(null);
      mockRepository.create.mockReturnValue(null);

      await service
        .update(1, {
          ...game,
          price: 4.5,
        })
        .catch((e) => {
          expect(e).toBeInstanceOf(InternalServerErrorException);
          expect(e).toMatchObject({
            message:
              'Ocorreu um erro ao atualizar o jogo, tente novamente mais tarde',
          });
        });
    });
  });

  describe('remove game', () => {
    it('should return true for game removed', async () => {
      const game = TestUtil.giveMeAValidGame();
      mockRepository.findOne.mockReturnValue(game);
      mockRepository.delete.mockReturnValue(game);
      const deletedGame = await service.remove(1);
      expect(deletedGame).toMatchObject({
        type: game.type,
        price: game.price,
        description: game.description,
      });
      expect(mockRepository.findOne).toBeCalledTimes(1);
      expect(mockRepository.delete).toBeCalledTimes(1);
    });

    it('should return a exception when doenst remove a game', async () => {
      const game = TestUtil.giveMeAValidGame();
      mockRepository.findOne.mockReturnValue(game);
      mockRepository.delete.mockReturnValue(null);
      await service.remove(1).catch((e) => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message:
            'Ocorreu um erro ao apagar o jogo, tente novamente mais tarde.',
        });
      });

      expect(mockRepository.findOne).toBeCalledTimes(1);
      expect(mockRepository.delete).toBeCalledTimes(1);
    });
  });
});
