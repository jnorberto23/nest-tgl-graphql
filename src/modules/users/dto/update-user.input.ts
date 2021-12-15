import { CreateUserInput } from './create-user.input';
import { InputType, PartialType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsString()
  id: string;

  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsEmail()
  email?: string;

  @IsString()
  password?: string;
}
