import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRole } from '../users-roles/entities/users-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UsersRole])],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
