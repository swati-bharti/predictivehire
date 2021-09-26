import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context).getContext();
    // const roles = this.reflector.get<string[]>(
    //   'roles',
    //   context.getHandler(),
    // );

    if (!gqlContext.headers.authorization) {
      return false;
    }
    gqlContext.user = await this.validateToken(
      gqlContext.headers.authorization,
    );

    const userWithNoPermission =
      gqlContext.user.role === 'user' &&
      (context.getHandler().name === 'addVacancy' ||
        context.getHandler().name === 'findOne' ||
        context.getHandler().name === 'updateVacancy' ||
        context.getHandler().name === 'deleteVacancy');

    if (userWithNoPermission) {
      
      return false;
    }
    return true;
  }
  async validateToken(bearer: string) {
    if (bearer.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Unauthorised', HttpStatus.UNAUTHORIZED);
    }
    try {
      const token = bearer.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);
      return decoded;
    } catch (error) {
      throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
    }
  }
}
