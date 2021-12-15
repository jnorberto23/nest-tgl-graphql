import { Injectable } from '@nestjs/common';
import { CreateBetInput } from './dto/create-bet.input';

@Injectable()
export class BetsService {
  create(bets: CreateBetInput[]) {
    return bets;
  }

  findAll() {
    return `This action returns all bets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bet`;
  }

  remove(id: number) {
    return `This action removes a #${id} bet`;
  }
}
