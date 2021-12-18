/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log("olha os guri requisitados kkkkkkkkkkkkkkkkkkkkkkkkkkkkj")
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log("olha os guri requisitados kkkkkkkkkkkkkkkkkkkkkkkkkkkkj")
    console.log(requiredRoles)

    const ctx = GqlExecutionContext.create(context);
    const [, token] = ctx.getContext().req.headers.authorization.split(' ');

    const decoded = this.jwtService.decode(token);
    console.log(decoded)

    return true;
  }
}
