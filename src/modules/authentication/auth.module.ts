import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersRole } from '../users-roles/entities/users-role.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Bet } from '../bets/entities/bet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UsersRole, Bet]),
    JwtModule.registerAsync({
      imports: [ConfigModule], // Missing this
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '7d',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthResolver, AuthService, UsersService, JwtStrategy],
})
export class AuthModule {}
