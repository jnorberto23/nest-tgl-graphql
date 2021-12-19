import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BetsService } from './bets.service';
import { Bet } from './entities/bet.entity';
import { CreateBetInput } from './dto/create-bet.input';
import { GqlAuthGuard } from '../authentication/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { GetAuthenticatedUser } from 'src/utils/GetAuthenticatedUser.decorator';

@Resolver(() => Bet)
export class BetsResolver {
  constructor(private readonly betsService: BetsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [Bet])
  createBet(
    @Args('bets', { type: () => [CreateBetInput] }) bets: CreateBetInput[],
    @GetAuthenticatedUser() user,
  ) {
    return this.betsService.create(user, bets);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Bet], { name: 'bets' })
  findAll(@GetAuthenticatedUser() user) {
    return this.betsService.findAll(user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Bet, { name: 'bet' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @GetAuthenticatedUser() user,
  ) {
    return this.betsService.findOne(user, id);
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Bet)
  removeBet(
    @Args('id', { type: () => Int }) id: number,
    @GetAuthenticatedUser() user,
  ) {
    return this.betsService.remove(user, id);
  }
}
