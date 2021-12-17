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
  JoinColumn,
} from 'typeorm';

@ObjectType()
@Entity('usersRoles')
export class UsersRole {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;

  @Field()
  @Column()
  userId: string;

  @Field()
  @Column()
  roleId: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.usersRole)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field(() => Role)
  @ManyToOne(() => Role, (role) => role.usersRole)
  @JoinColumn({ name: 'roleId' })
  role: Role;
}
