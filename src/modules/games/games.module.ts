import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Game } from './entities/game.entity';
import { GameDTO } from '../games/dto/game-dto';
import { CreateGameInput } from '../games/dto/create-game.input';
import { UpdateGameInput } from '../games/dto/update-game.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Game])],
      resolvers: [
        {
          DTOClass: GameDTO,
          EntityClass: Game,
          CreateDTOClass: CreateGameInput,
          UpdateDTOClass: UpdateGameInput,
          enableTotalCount: true,
        },
      ],
    }),
  ],
  providers: [],
})
export class GamesModule {}
