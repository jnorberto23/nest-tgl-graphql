import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { use } from 'passport';
import TestUtil from '../../utils/TestUtil';
import { CartService } from '../cart/cart.service';
import { Cart } from '../cart/entities/cart.entity';
import { Game } from '../games/entities/game.entity';
import { User } from '../users/entities/user.entity';
import { BetsService } from './bets.service';

import { Bet } from './entities/bet.entity';

describe('BetsService', () => {
  let service: BetsService;

  const mockRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BetsService,
        CartService,
        {
          provide: getRepositoryToken(Bet),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
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

    service = module.get<BetsService>(BetsService);
  });

  beforeEach(async () => {
    mockRepository.findOne.mockReset();
    mockRepository.find.mockReset();
    mockRepository.create.mockReset();
    mockRepository.save.mockReset();
    mockRepository.delete.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find games from user', () => {
    it('should list all games from user', async () => {
      const user = TestUtil.giveMeAValidUser();
      const bet = TestUtil.giveMeAValidBet();
      mockRepository.find.mockReturnValue([bet, bet]);
      const games = await service.findAll(user);
      expect(games).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove bet', () => {
    it('should return true for game removed', async () => {
      const bet = TestUtil.giveMeAValidBet();
      const user = TestUtil.giveMeAValidUser();
      bet[0].userId = user.id;
      mockRepository.findOne.mockReturnValue(bet[0]);
      mockRepository.delete.mockReturnValue(bet[0]);
      const deletedGame = await service.remove(user, 1);
      expect(deletedGame).toMatchObject({
        userId: bet[0].userId,
      });
      expect(mockRepository.findOne).toBeCalledTimes(1);
      expect(mockRepository.delete).toBeCalledTimes(1);
    });

    it('should return a exception when doenst remove a game', async () => {
      const bet = TestUtil.giveMeAValidBet();
      const user = TestUtil.giveMeAValidUser();
      mockRepository.findOne.mockReturnValue(bet);
      mockRepository.delete.mockReturnValue(bet);
      await service.remove(user, 1).catch((e) => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
      });
      expect(mockRepository.findOne).toBeCalledTimes(1);
    });
  });
});
