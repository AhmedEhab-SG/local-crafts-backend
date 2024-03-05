import { UsersService } from './../../users/users.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());

    const request = context.switchToHttp().getRequest();

    if (request?.user_id) {
      const _id = request.user_id;
      const user = await this.usersService.findById(_id);

      request['role'] = user.role;
      return roles.some((role) => role === user.role);
    }

    return false;
  }
}
