import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}
