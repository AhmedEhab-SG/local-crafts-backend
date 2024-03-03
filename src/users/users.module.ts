import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserModel } from 'src/mongo/models/user.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModel],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
})
export class UsersModule {}
