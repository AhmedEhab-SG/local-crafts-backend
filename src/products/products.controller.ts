import { UsersService } from './../users/users.service';

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
import { ProductsService } from './products.service';
import { Product } from 'src/mongo/schemas/product.schema';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UpdateProductDto } from './dtos/updateProduct.dto';
import { ParseObjectIdPipe } from 'src/shared/pipes/parseObjectId.pipe';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { PaginatedDto } from 'src/shared/dtos/paginated.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
  ) {}

  @Get('/')
  async getProductsPaginate(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ): Promise<PaginatedDto<Product>> {
    return await this.productsService.find(page, limit);
  }

  @Get('user/:_id')
  async getAllProductsByUserId(
    @Param('_id', ParseObjectIdPipe) _id: string,
  ): Promise<Product[]> {
    return await this.productsService.findByUserId(_id);
  }

  @Get(':_id')
  async getProductById(
    @Param('_id', ParseObjectIdPipe) _id: string,
  ): Promise<Product> {
    return await this.productsService.findById(_id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles(['admin', 'vendor'])
  async createProduct(
    @Body() product: CreateProductDto,
    @Request() request: { user_id: string },
  ): Promise<Product> {
    const vendor = await this.usersService.findById(request.user_id);
    console.log(vendor);
    return await this.productsService.create(product, request.user_id, vendor);
  }

  @Patch(':_id')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles(['admin', 'vendor'])
  async updateProduct(
    @Param('_id', ParseObjectIdPipe) _id: string,
    @Body() product: UpdateProductDto,
    @Request() request: { role: string; user_id: string },
  ): Promise<Product> {
    if (request.role === 'admin') request.user_id = request.role;
    return await this.productsService.update(_id, product, request.user_id);
  }

  @Delete(':_id')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles(['admin', 'vendor'])
  async deleteProduct(
    @Param('_id', ParseObjectIdPipe) _id: string,
    @Request() request: { role: string; user_id: string },
  ): Promise<Product> {
    if (request.role === 'admin') request.user_id = request.role;
    return await this.productsService.delete(_id, request.user_id);
  }
}
