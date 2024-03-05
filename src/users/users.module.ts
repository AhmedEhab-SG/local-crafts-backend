import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserModel } from 'src/mongo/models/user.model';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
  imports: [UserModel],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  exports: [UsersService, JwtService],
})
export class UsersModule {}
