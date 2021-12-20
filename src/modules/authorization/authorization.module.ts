import { Module } from '@nestjs/common';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [],

  providers: [RolesGuard],
})
export class AuthorizationModule {}
