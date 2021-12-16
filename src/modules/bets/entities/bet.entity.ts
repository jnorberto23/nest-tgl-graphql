import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Game } from 'src/modules/games/entities/game.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@ObjectType()
@Entity('bets')
export class Bet {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;

  @Field()
  @Column()
  numbers: string;

  @Field()
  @Column()
  userId: string;

  @Field()
  @Column()
  gameId: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => User)
  @ManyToOne((type) => User, (bets) => Bet)
  user: User;

  @Field(() => Game)
  @ManyToOne((type) => Game, (games) => Game)
  game: Game;
}
