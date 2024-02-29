import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/mongo/schemas/products.schema';
import { CreateProductDto } from './dtos/createProdcut.dto';
import { ObjectId } from 'mongoose';
import { UpdateProductDto } from './dtos/updateProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly prodcutsService: ProductsService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.prodcutsService.find();
  }

  @Get(':_id')
  async getProdcutById(@Param('_id') _id: ObjectId): Promise<Product> {
    return await this.prodcutsService.findById(_id);
  }

  @Post()
  async createProduct(@Body() product: CreateProductDto): Promise<Product> {
    console.log(product);
    return await this.prodcutsService.create(product);
  }

  @Patch(':_id')
  async updateProduct(
    @Param('_id') _id: ObjectId,
    @Body() product: UpdateProductDto,
  ): Promise<Product> {
    return await this.prodcutsService.update(_id, product);
  }

  @Delete(':_id')
  async deleteProduct(@Param('_id') _id: ObjectId): Promise<Product> {
    return await this.prodcutsService.delete(_id);
  }
}
