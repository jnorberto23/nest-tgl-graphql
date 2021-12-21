import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from '../../utils/TestUtil';
import { Bet } from '../bets/entities/bet.entity';
import { Game } from '../games/entities/game.entity';
import { UsersRole } from '../users-roles/entities/users-role.entity';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
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
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Bet),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Game),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(UsersRole),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
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

  describe('findAllUsers', () => {
    it('should list all users', async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.find.mockReturnValue([user, user]);
      const users = await service.findAll();
      expect(users).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findUserByid', () => {
    it('should list a user', async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.findOne.mockReturnValue(user);
      const userFound = await service.findOne(user.id);
      expect(userFound).toMatchObject({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
    it('should return a exception when does not find a user', async () => {
      mockRepository.findOne.mockReturnValue(null);
      expect(service.findOne('213412541241243')).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('create user', () => {
    it('should create a user', async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.save.mockReturnValue(user);
      mockRepository.create.mockReturnValue(user);
      const savedUser = await service.create(user);
      expect(savedUser).toMatchObject(user);
      expect(mockRepository.create).toBeCalledTimes(2);
      expect(mockRepository.save).toBeCalledTimes(2);
    });
    it('should return a exception when email is registered', async () => {
      const user = TestUtil.giveMeAValidUser();
      user.username = 'testeuser123';
      mockRepository.findOne.mockReturnValue(user);
      await service.create(user).catch((e) => {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e).toMatchObject({
          message: 'O email já esta registrado.',
        });
      });
    });
    it('should return a exception when username is registered', async () => {
      const user = TestUtil.giveMeAValidUser();
      user.email = 'testeuser123@email.com';
      mockRepository.findOne.mockReturnValue(user);
      await service.create(user).catch((e) => {
        expect(e).toBeInstanceOf(BadRequestException);
      });
    });

    it('should return a exception when doenst create a user', async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.save.mockReturnValue(null);
      mockRepository.create.mockReturnValue(user);
      await service.create(user).catch((e) => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message:
            'Ocorreu um erro ao salvar o usuário, tente novamente mais tarde',
        });
      });
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    });
  });

  describe('Update user', () => {
    it('should update a user', async () => {
      const user = TestUtil.giveMeAValidUser();
      const updatedUser = { firstName: 'Jão' };
      mockRepository.findOne.mockReturnValue(user);
      mockRepository.update.mockReturnValue({
        ...user,
        ...updatedUser,
      });
      mockRepository.create.mockReturnValue({
        ...user,
        ...updatedUser,
      });
      const resultUser = await service.update('1', {
        ...user,
        firstName: 'Jão',
      });
      expect(resultUser).toMatchObject(updatedUser);
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.findOne).toBeCalledTimes(1);
      expect(mockRepository.update).toBeCalledTimes(1);
    });
    it('should return a exception when doenst update a user', async () => {
      const user = TestUtil.giveMeAValidUser();

      mockRepository.findOne.mockReturnValue(user);
      mockRepository.update.mockReturnValue(null);
      mockRepository.create.mockReturnValue(null);

      await service
        .update('1', {
          ...user,
          firstName: 'Jão',
        })
        .catch((e) => {
          expect(e).toBeInstanceOf(InternalServerErrorException);
          expect(e).toMatchObject({
            message:
              'Ocorreu um erro ao atualizar o usuário, tente novamente mais tarde',
          });
        });
    });
  });

  describe('remove user', () => {
    it('should return true for user removed', async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.findOne.mockReturnValue(user);
      mockRepository.delete.mockReturnValue(user);
      const deletedUser = await service.remove('1');
      expect(deletedUser).toMatchObject({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
      expect(mockRepository.findOne).toBeCalledTimes(1);
      expect(mockRepository.delete).toBeCalledTimes(1);
    });

    it('should return a exception when doenst remove a user', async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.findOne.mockReturnValue(user);
      mockRepository.delete.mockReturnValue(null);
      await service.remove('1').catch((e) => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message:
            'Ocorreu um erro ao apagar o usuario, tente novamente mais tarde.',
        });
      });

      expect(mockRepository.findOne).toBeCalledTimes(1);
      expect(mockRepository.delete).toBeCalledTimes(1);
    });
  });
});
