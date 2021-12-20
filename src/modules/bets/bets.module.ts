import { Module } from '@nestjs/common';
import { BetsService } from './bets.service';
import { BetsResolver } from './bets.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bet } from './entities/bet.entity';
import { Game } from '../games/entities/game.entity';
import { CartService } from '../cart/cart.service';
import { Cart } from '../cart/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bet, Game, Cart])],
  providers: [BetsResolver, BetsService, CartService],
})
export class BetsModule {}
