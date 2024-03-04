import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategorySchema } from "../schemas/category.schema";
import { Service } from "../schemas/services.schema";

export const SCategoryName = Service.name + '_' + Category.name
export const ServiceCategoryModel = MongooseModule.forFeatureAsync([{
  name: SCategoryName, useFactory: () => CategorySchema,
}])
