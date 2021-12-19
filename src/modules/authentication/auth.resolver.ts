import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { CreateAuthInput } from './dto/create-auth.input';
import { AuthType } from './dto/auth.type';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthType)
  async login(@Args('data') data: CreateAuthInput): Promise<AuthType> {
    const response = await this.authService.validateUser(data);
    return {
      user: response.user,
      token: response.token,
      role: response.role,
    };
  }
}
