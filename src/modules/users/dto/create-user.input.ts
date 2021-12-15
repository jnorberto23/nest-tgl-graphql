import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'firstName não pode estar vazio' })
  @Field(() => String)
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'lastName não pode estar vazio' })
  @Field()
  lastName: string;

  @IsString()
  @IsNotEmpty({ message: 'username não pode estar vazio' })
  @Field()
  username: string;

  @IsEmail()
  @IsNotEmpty({ message: 'email não pode estar vazio' })
  @Field()
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'password não pode estar vazio' })
  @Field()
  password: string;
}
