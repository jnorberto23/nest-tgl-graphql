import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesResolver } from './games.resolver';
import { Game } from './entities/game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../cart/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Cart])],
  providers: [GamesResolver, GamesService],
})
export class GamesModule {}
