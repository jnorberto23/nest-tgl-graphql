import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGameInput {
  @Field()
  type: string;

  @Field()
  description: string;

  @Field()
  range: number;

  @Field()
  price: number;

  @Field()
  maxNumber: number;

  @Field()
  color: string;
}
