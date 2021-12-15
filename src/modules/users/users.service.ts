import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const emailIsRegistered = await this.userRepository.findOne({
      where: { email: createUserInput.email },
    });

    const usernameIsRegistered = await this.userRepository.findOne({
      where: { username: createUserInput.username },
    });

    if (usernameIsRegistered)
      throw new BadRequestException('O nome de usuário já esta registrado.');

    if (emailIsRegistered)
      throw new BadRequestException('O email já esta registrado.');

    const user = await this.userRepository.create({ ...createUserInput });
    const userSaved = await this.userRepository.save(user);

    if (!userSaved)
      throw new InternalServerErrorException(
        'Ocorreu um erro ao salvar o usuário, tente novamente mais tarde',
      );

    return user;
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) throw new NotFoundException('Nenhum usuário encontrado');
    return user;
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
