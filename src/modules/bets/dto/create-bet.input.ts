import { InputType, Field, Int } from '@nestjs/graphql';
import { IsArray, IsNumber } from 'class-validator';

@InputType()
export class CreateBetInput {
  @IsNumber()
  @Field(() => Int)
  gameId: number;

  @Field(() => [Int])
  @IsArray()
  numbers: number[];
}
