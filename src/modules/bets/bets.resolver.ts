import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BetsService } from './bets.service';
import { Bet } from './entities/bet.entity';
import { CreateBetInput } from './dto/create-bet.input';

@Resolver(() => Bet)
export class BetsResolver {
  constructor(private readonly betsService: BetsService) {}

  @Mutation(() => [Bet])
  createBet(
    @Args('bets', { type: () => [CreateBetInput] }) bets: CreateBetInput[],
  ) {
    return this.betsService.create(bets);
  }

  @Query(() => [Bet], { name: 'bets' })
  findAll() {
    return this.betsService.findAll();
  }

  @Query(() => Bet, { name: 'bet' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.betsService.findOne(id);
  }

  @Mutation(() => Bet)
  removeBet(@Args('id', { type: () => Int }) id: number) {
    return this.betsService.remove(id);
  }
}
