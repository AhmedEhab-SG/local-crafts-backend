import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategorySchema } from "../schemas/category.schema";
import { Product } from "../schemas/products.schema";

export const PCategoryName = Product.name + '_' + Category.name
export const ProductCategoryModel = MongooseModule.forFeatureAsync([{
  name: PCategoryName, useFactory: () => CategorySchema,
}])
