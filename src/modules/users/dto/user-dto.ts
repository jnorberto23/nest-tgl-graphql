import { FilterableField } from '@nestjs-query/query-graphql';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('User')
export class UserDto {
  @Field()
  id: string;

  @FilterableField()
  firstName: string;

  @FilterableField()
  lastName: string;

  @FilterableField()
  email: string;

  @FilterableField()
  username: string;

  @FilterableField()
  password: string;

  @FilterableField()
  createdAt: Date;

  @FilterableField()
  updatedAt: Date;
}
