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
import { ProductsService } from './products.service';
import { Product } from 'src/mongo/schemas/products.schema';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UpdateProductDto } from './dtos/updateProduct.dto';
import { ParseObjectIdPipe } from 'src/shared/pipes/parseObjectId.pipe';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productsService.find();
  }

  @Get(':_id')
  async getproductById(
    @Param('_id', ParseObjectIdPipe) _id: string,
  ): Promise<Product> {
    return await this.productsService.findById(_id);
  }

  @Post()
  async createProduct(@Body() product: CreateProductDto): Promise<Product> {
    return await this.productsService.create(product);
  }

  @Patch(':_id')
  async updateProduct(
    @Param('_id', ParseObjectIdPipe) _id: string,
    @Body() product: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.update(_id, product);
  }

  @Delete(':_id')
  async deleteProduct(
    @Param('_id', ParseObjectIdPipe) _id: string,
  ): Promise<Product> {
    return await this.productsService.delete(_id);
  }
}
