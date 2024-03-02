import { Module } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { CityModel } from 'src/mongo/models/city.model';
import { GovModel } from 'src/mongo/models/gov.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [CityModel, GovModel],
  controllers: [LocationsController],
  providers: [LocationsService, JwtService]
})
export class LocationsModule {}
