import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { ServiceModel } from 'src/mongo/models/service.model';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserModel } from 'src/mongo/models/user.model';

@Module({
  imports: [ServiceModel, UserModel],
  controllers: [ServicesController],
  providers: [ServicesService, JwtService, UsersService],
})
export class ServicesModule {}
