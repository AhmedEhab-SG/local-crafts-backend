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
import { Roles } from 'src/shared/decorators/roles.decorator';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productsService.find();
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
  async createProduct(@Body() product: CreateProductDto): Promise<Product> {
    return await this.productsService.create(product);
  }

  @Patch(':_id')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles(['admin', 'vendor'])
  async updateProduct(
    @Param('_id', ParseObjectIdPipe) _id: string,
    @Body() product: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.update(_id, product);
  }

  @Delete(':_id')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles(['admin', 'vendor'])
  async deleteProduct(
    @Param('_id', ParseObjectIdPipe) _id: string,
  ): Promise<Product> {
    return await this.productsService.delete(_id);
  }
}
