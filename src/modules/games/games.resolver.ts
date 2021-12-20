import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GamesService } from './games.service';
import { Game } from './entities/game.entity';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { GqlAuthGuard } from '../authentication/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../authorization/common/roles.decorator';
import { Role } from '../authorization/common/roles.enum';
import { RolesGuard } from '../authorization/guards/roles.guard';

@Resolver(() => Game)
export class GamesResolver {
  constructor(private readonly gamesService: GamesService) {}

  @Mutation(() => Game)
  @Roles(Role.Admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  createGame(@Args('createGameInput') createGameInput: CreateGameInput) {
    return this.gamesService.create(createGameInput);
  }

  @Query(() => [Game], { name: 'games' })
  findAll() {
    return this.gamesService.findAll();
  }

  @Query(() => Game, { name: 'game' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.gamesService.findOne(id);
  }

  @Roles(Role.Admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Game)
  updateGame(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateGameInput') updateGameInput: UpdateGameInput,
  ) {
    return this.gamesService.update(id, updateGameInput);
  }

  @Roles(Role.Admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Game)
  removeGame(@Args('id', { type: () => Int }) id: number) {
    return this.gamesService.remove(id);
  }
}
