import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateGameInput {
  @IsString()
  @IsNotEmpty({ message: 'type não pode estar vazio' })
  @Field(() => String)
  type: string;

  @IsString()
  @IsNotEmpty({ message: 'description não pode estar vazio' })
  @Field()
  description: string;

  @IsNumber()
  @IsNotEmpty({ message: 'range não pode estar vazio' })
  @Field()
  range: number;

  @IsNumber()
  @IsNotEmpty({ message: 'price não pode estar vazio' })
  @Field()
  price: number;

  @IsNumber()
  @IsNotEmpty({ message: 'maxNumber não pode estar vazio' })
  @Field()
  maxNumber: number;

  @IsString()
  @IsNotEmpty({ message: 'color não pode estar vazio' })
  @Field()
  color: string;
}
