import { InputType, Field, Int } from '@nestjs/graphql';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateBetInput {
  @IsNumber()
  @Field(() => Int)
  gameId: number;

  @Field(() => [Int])
  @IsArray()
  numbers: number[];
}
  