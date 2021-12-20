import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
@InputType()
export class CreateAuthInput {
  @IsEmail()
  @IsNotEmpty({ message: 'email não pode estar vazio' })
  @Field()
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'password não pode estar vazio' })
  @Field()
  password: string;
}
