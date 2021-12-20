import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Game } from '../../games/entities/game.entity';
import { User } from '../../users/entities/user.entity';

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
  @ManyToOne((type) => User, (user) => User)
  user: User;

  @Field(() => Game)
  @ManyToOne((type) => Game, (games) => Game)
  game: Game;
}
