import { CreateGameInput } from './create-game.input';
import { InputType, PartialType } from '@nestjs/graphql';
import { IsString, IsOptional, IsNumber } from 'class-validator';

@InputType()
export class UpdateGameInput extends PartialType(CreateGameInput) {
  id: number;
  @IsOptional()
  @IsString()
  type?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  range?: number;

  @IsNumber()
  @IsOptional()
  maxNumber?: number;

  @IsOptional()
  @IsString()
  color?: string;
}
