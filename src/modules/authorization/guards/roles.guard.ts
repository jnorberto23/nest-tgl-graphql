/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../common/roles.decorator';
import { Role } from '../common/roles.enum';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<Role[]>(ROLES_KEY,
      context.getHandler(),
    );

    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req

    if (!req.user) return true;

    const role = req.user.usersRole[0].role.type

    if (!(role === requiredRoles[0])) {
      throw new UnauthorizedException('Acesso negado: Rota permitida apenas para administradores');
    }

    return true
  }
}
