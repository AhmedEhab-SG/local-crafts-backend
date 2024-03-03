import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import 'dotenv/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.token;

    if (!token) {
      throw new UnauthorizedException('Unauthorized access');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      request['user_id'] = payload.sub;
      request['email'] = payload.email;
    } catch {
      throw new UnauthorizedException('Unauthorized access');
    }
    return true;
  }
}
