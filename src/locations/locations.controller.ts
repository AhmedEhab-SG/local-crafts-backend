import { Type } from 'class-transformer';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  UseGuards
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ParseObjectIdPipe } from 'src/shared/pipes/parseObjectId.pipe';

@Controller('locations')
export class LocationsController {
  constructor(
    private readonly locationService: LocationsService,
  ) { }

  @Get('governorates')
  getAllGovernorates() {
    return this.locationService.getAllGov();
  }

  @UseGuards(AuthGuard)
  @Post('governorates')
  async addGov(@Body(new ParseArrayPipe()) names: string[]) {
    try {
      return await this.locationService.addGovernorates(names);
    }
    catch (error) {
      let msg = error._message ?
        'Body must be array' :
        'some governorates already exists';
      throw new BadRequestException({
        error: 'Bad Request',
        statusCode: 400,
        message: msg,
        inserted: error.insertedDocs,
        failed: error.writeErrors?.map(e => e.err.op),
      });
    }
  }

  @UseGuards(AuthGuard)
  @Delete('governorates/:govId')
  deleteGov(@Param('govId', ParseObjectIdPipe) govId: string) {
    return this.locationService.deleteGov(govId);
  }

  @Get('cities')
  getAllCities() {
    return this.locationService.getAllCities();
  }

  @Get('cities/:govId')
  getCitiesByGov(@Param('govId', ParseObjectIdPipe) govId: string) {
    return this.locationService.getCitiesByGov(govId);
  }

  @UseGuards(AuthGuard)
  @Post('cities/:govId')
  async addCity(
    @Param('govId', ParseObjectIdPipe) govId: string,
    @Body(new ParseArrayPipe({ items: String })) cities: string[]
  ) {
    try {
      return await this.locationService.addCities(govId, cities);
    }
    catch (error) {
      let msg = error._message ?
        'Body must be array' :
        'some cities already exists';
      throw new BadRequestException({
        error: 'Bad Request',
        statusCode: 400,
        message: msg,
        inserted: error.insertedDocs,
        failed: error.writeErrors?.map(e => e.err.op),
      });
    }
  }

  @UseGuards(AuthGuard)
  @Delete('cities/:cityId')
  deleteCity(@Param('cityId', ParseObjectIdPipe) cityId: string) {
    return this.locationService.deleteCity(cityId);
  }
}
