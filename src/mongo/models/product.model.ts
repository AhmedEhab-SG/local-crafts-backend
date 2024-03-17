import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductsSchema } from '../schemas/product.schema';

export const ProductModel = MongooseModule.forFeatureAsync([
  {
    name: Product.name,
    useFactory: () => {
      ProductsSchema.index({name: 'text', description: 'text'});
      return ProductsSchema;
    }
  },
]);

// @Module({
//   imports: [productModel],
//   exports: [productModel],
// })
// export class ProductModule {}
