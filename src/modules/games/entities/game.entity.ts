import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Bet } from 'src/modules/bets/entities/bet.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@ObjectType()
@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  range: number;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  maxNumber: number;

  @Field()
  @Column()
  color: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Bet)
  @OneToMany((type) => Bet, (game) => Game)
  bets: Bet[];
}
