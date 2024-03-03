import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from 'src/mongo/schemas/services.schema';
import { UpdateServiceDto } from './dtos/updateService.dto';
import { CreateServiceDto } from './dtos/createService.dto';
import { ParseObjectIdPipe } from 'src/shared/pipes/parseObjectId.pipe';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { Roles } from 'src/shared/guards/roles.decorator';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async getAllServices(): Promise<Service[]> {
    return await this.servicesService.find();
  }

  @Get('user/:_id')
  async getAllServicesByUserId(
    @Param('_id', ParseObjectIdPipe) _id: string,
  ): Promise<Service[]> {
    return await this.servicesService.findByUserId(_id);
  }

  @Get(':_id')
  async getServiceById(
    @Param('_id', ParseObjectIdPipe) _id: string,
  ): Promise<Service> {
    return await this.servicesService.findById(_id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles(['admin', 'vendor'])
  async createService(@Body() Service: CreateServiceDto): Promise<Service> {
    console.log(Service);
    return await this.servicesService.create(Service);
  }

  @Patch(':_id')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles(['admin', 'vendor'])
  async updateService(
    @Param('_id', ParseObjectIdPipe) _id: string,
    @Body() Service: UpdateServiceDto,
  ): Promise<Service> {
    return await this.servicesService.update(_id, Service);
  }

  @Delete(':_id')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles(['admin', 'vendor'])
  async deleteService(
    @Param('_id', ParseObjectIdPipe) _id: string,
  ): Promise<Service> {
    return await this.servicesService.delete(_id);
  }
}
