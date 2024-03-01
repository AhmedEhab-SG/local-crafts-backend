import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CityModel } from 'src/mongo/models/city.model';
import { UserModel } from 'src/mongo/models/user.model';
import { GovModel } from 'src/mongo/models/gov.model';

@Module({
  imports: [UserModel, CityModel, GovModel],
  controllers: [AuthController],
  providers: [AuthService, JwtService]
})
export class AuthModule { }
