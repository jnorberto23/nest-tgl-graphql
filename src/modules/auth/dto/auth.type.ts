import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/users/entities/user.entity';
@ObjectType()
export class AuthType {
  @Field(() => User)
  user: User;

  @Field()
  token: string;

  @Field()
  role?: string;
}
