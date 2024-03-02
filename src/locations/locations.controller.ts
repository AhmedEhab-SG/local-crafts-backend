import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';

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
  addGov(@Body() names: [string]) {
    return this.locationService.addGovernorates(names);
  }

  @UseGuards(AuthGuard)
  @Delete('governorates/:govId')
  deleteGov(@Param('govId') govId: string) {
    return this.locationService.deleteGov(govId);
  }

  @Get('cities/:govId')
  getCitiesByGov(@Param('govId') govId: string) {
    return this.locationService.getCitiesByGov(govId);
  }

  @UseGuards(AuthGuard)
  @Post('cities/:govId')
  addCity(@Param('govId') govId: string, @Body() cities: [string]) {
    return this.locationService.addCities(govId, cities);
  }

  @UseGuards(AuthGuard)
  @Delete('cities/:cityId')
  deleteCity(@Param('cityId') cityId: string) {
    return this.locationService.deleteCity(cityId);
  }
}
