import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductsSchema } from '../schemas/products.schema';

export const ProductModel = MongooseModule.forFeatureAsync([
  { name: Product.name, useFactory: () => ProductsSchema },
]);

// @Module({
//   imports: [productModel],
//   exports: [productModel],
// })
// export class ProductModule {}
