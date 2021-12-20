import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { UsersRole } from '../../users-roles/entities/users-role.entity';

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

  @Field(() => UsersRole)
  @OneToMany((type) => UsersRole, (usersRole) => UsersRole)
  usersRole: UsersRole[];
}
