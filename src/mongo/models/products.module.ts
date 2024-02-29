import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductsSchema } from '../schemas/products.schema';
import { Module } from '@nestjs/common';

export const productModel = MongooseModule.forFeatureAsync([
  { name: Product.name, useFactory: () => ProductsSchema },
]);

@Module({
  imports: [productModel],
  exports: [productModel],
})
export class ProductModule {}
