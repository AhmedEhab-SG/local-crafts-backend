import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductsSchema } from '../schemas/products.schema';

export const productModel = MongooseModule.forFeatureAsync([
  { name: Product.name, useFactory: () => ProductsSchema },
]);
