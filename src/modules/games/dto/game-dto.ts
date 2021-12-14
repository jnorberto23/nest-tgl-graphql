import { FilterableField } from '@nestjs-query/query-graphql';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('Game')
export class GameDTO {
  @FilterableField()
  id: number;

  @FilterableField()
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

  @FilterableField()
  createdAt: Date;

  @FilterableField()
  updatedAt: Date;
}
