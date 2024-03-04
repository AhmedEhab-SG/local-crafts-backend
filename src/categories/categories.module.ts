import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { ServiceCategoryModel } from 'src/mongo/models/serviceCategory.model';
import { ProductCategoryModel } from 'src/mongo/models/productCategory.model';

@Module({
  imports: [ServiceCategoryModel, ProductCategoryModel],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
