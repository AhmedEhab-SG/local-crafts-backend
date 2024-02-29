import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { productModel } from 'src/mongo/models/products.model';

@Module({
  imports: [productModel],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
