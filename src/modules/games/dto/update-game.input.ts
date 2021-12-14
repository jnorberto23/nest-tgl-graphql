import { CreateGameInput } from './create-game.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGameInput extends PartialType(CreateGameInput) {
  id: number;
  type: string;
  description: string;
  range: number;
  price: number;
  maxNumber: number;
  color: string;
}
