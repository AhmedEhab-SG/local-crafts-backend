import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from 'src/mongo/schemas/services.schema';
import { UpdateServiceDto } from './dtos/updateService.dto';
import { ObjectId } from 'mongoose';
import { CreateServiceDto } from './dtos/createService.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async getAllProducts(): Promise<Service[]> {
    return await this.servicesService.find();
  }

  @Get(':_id')
  async getproductById(@Param('_id') _id: ObjectId): Promise<Service> {
    return await this.servicesService.findById(_id);
  }

  @Post()
  async createProduct(@Body() Service: CreateServiceDto): Promise<Service> {
    console.log(Service);
    return await this.servicesService.create(Service);
  }

  @Patch(':_id')
  async updateProduct(
    @Param('_id') _id: ObjectId,
    @Body() Service: UpdateServiceDto,
  ): Promise<Service> {
    return await this.servicesService.update(_id, Service);
  }

  @Delete(':_id')
  async deleteProduct(@Param('_id') _id: ObjectId): Promise<Service> {
    return await this.servicesService.delete(_id);
  }
}
