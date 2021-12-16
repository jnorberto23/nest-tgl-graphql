import { ObjectType, Field, HideField } from '@nestjs/graphql';
import * as bcrypt from 'bcryptjs';
import { Bet } from 'src/modules/bets/entities/bet.entity';
import { UsersRole } from 'src/modules/users-roles/entities/users-role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';

@ObjectType()
@Entity('users')
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  username: string;

  @Column()
  @HideField()
  password: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Bet)
  @OneToMany((type) => Bet, (user) => User)
  bets: Bet[];

  @Field(() => UsersRole)
  @OneToMany((type) => UsersRole, (user) => User)
  usersRole: UsersRole[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}
