import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UsersModule } from './modules/users/users.module';
import { GamesModule } from './modules/games/games.module';
import { BetsModule } from './modules/bets/bets.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    TypeOrmModule.forRoot(),
    UsersModule,
    GamesModule,
    BetsModule,
  ],
  providers: [AppService],
})
export class AppModule {}
