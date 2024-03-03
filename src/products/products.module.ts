import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductModel } from 'src/mongo/models/products.model';

@Module({
  imports: [ProductModel],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
