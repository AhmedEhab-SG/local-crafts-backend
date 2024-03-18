import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from 'src/mongo/schemas/service.schema';
import { UpdateServiceDto } from './dtos/updateService.dto';
import { CreateServiceDto } from './dtos/createService.dto';
import { ParseObjectIdPipe } from 'src/shared/pipes/parseObjectId.pipe';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UsersService } from 'src/users/users.service';
import { PaginatedDto } from 'src/shared/dtos/paginated.dto';

@Controller('services')
export class ServicesController {
  constructor(
    private readonly servicesService: ServicesService,
    private readonly usersService: UsersService,
  ) {}

  @Get('/')
  async getServicesPaginate(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('category') category: string,
  ): Promise<PaginatedDto<Service>> {
    return await this.servicesService.find(page, limit, category);
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
  async createService(
    @Body() service: CreateServiceDto,
    @Request() request: { user_id: string },
  ): Promise<Service> {
    const vendor = await this.usersService.findById(request.user_id);
    return await this.servicesService.create(service, request.user_id, vendor);
  }

  @Patch(':_id')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles(['admin', 'vendor'])
  async updateService(
    @Param('_id', ParseObjectIdPipe) _id: string,
    @Body() service: UpdateServiceDto,
    @Request() request: { role: string; user_id: string },
  ): Promise<Service> {
    if (request.role === 'admin') request.user_id = request.role;
    return await this.servicesService.update(_id, service, request.user_id);
  }

  @Delete(':_id')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles(['admin', 'vendor'])
  async deleteService(
    @Param('_id', ParseObjectIdPipe) _id: string,
    @Request() request: { role: string; user_id: string },
  ): Promise<Service> {
    if (request.role === 'admin') request.user_id = request.role;
    return await this.servicesService.delete(_id, request.user_id);
  }
}
