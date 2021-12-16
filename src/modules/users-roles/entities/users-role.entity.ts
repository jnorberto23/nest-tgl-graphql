import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Role } from 'src/modules/roles/entities/role.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@ObjectType()
@Entity('userRoles')
export class UsersRole {
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

  @Field(() => User)
  @ManyToOne((type) => User, (usersRole) => UsersRole)
  user: User;

  @Field(() => Role)
  @ManyToOne((type) => Role, (usersRole) => UsersRole)
  role: Role;
}
