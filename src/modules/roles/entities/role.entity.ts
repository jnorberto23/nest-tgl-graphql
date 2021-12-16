import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;

  @Field()
  @Column()
  type: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
