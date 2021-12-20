import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthInput } from './dto/create-auth.input';
import * as bcrypt from 'bcryptjs';
import { AuthType } from './dto/auth.type';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: CreateAuthInput): Promise<AuthType> {
    const user = await this.usersService.getByEmail(data.email);

    const validPassword = await bcrypt.compareSync(
      data.password,
      user.password,
    );

    if (!validPassword) {
      throw new UnauthorizedException('Senha incorreta');
    }

    const token = await this.jwtToken(user);
    return {
      user,
      token,
      role: user.usersRole[0].role.type,
    };
  }

  private async jwtToken(user: User): Promise<string> {
    const payload = {
      email: user.email,
      id: user.id,
      role: user.usersRole[0].role.type,
    };
    return this.jwtService.signAsync(payload);
  }
}
