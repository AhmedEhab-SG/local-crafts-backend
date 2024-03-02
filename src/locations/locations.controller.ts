import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(
    private readonly locationService: LocationsService,
  ) { }

  @Get('governorates')
  getAllGovernorates() {
    return this.locationService.getAllGov();
  }

  @Post('governorates')
  addGov(@Body() names: [string]) {
    return this.locationService.addGovernorates(names);
  }

  @Delete('governorates/:govId')
  deleteGov(@Param('govId') govId: string) {
    return this.locationService.deleteGov(govId);
  }

  @Get('cities/:govId')
  getCitiesByGov(@Param('govId') govId: string) {
    return this.locationService.getCitiesByGov(govId);
  }

  @Post('cities/:govId')
  addCity(@Param('govId') govId: string, @Body() cities: [string]) {
    return this.locationService.addCities(govId, cities);
  }

  @Delete('cities/:cityId')
  deleteCity(@Param('cityId') cityId: string) {
    return this.locationService.deleteCity(cityId);
  }
}
