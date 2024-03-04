import { MainCategoryDto } from './dtos/mainCategory.dto';
import { Category } from 'src/mongo/schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { SCategoryName } from 'src/mongo/models/serviceCategory.model';
import { PCategoryName } from 'src/mongo/models/productCategory.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(SCategoryName) private readonly serviceCModel: Model<Category>,
    @InjectModel(PCategoryName) private readonly productCModel: Model<Category>,
  ) { }

  models = { 
    services: this.serviceCModel,
    products: this.productCModel
  }

  async getAllMainCategories(section: string) {
    return await this.models[section]?.find({ parent: null });
  }

  async getSubCategories(id: string, section: string) {
    return await this.models[section]?.find({ parent: id });
  }

  async addMainCategory(category: MainCategoryDto, section: string) {
    return await this.models[section]?.create(category);
  }

  async addSubCategories(parentId: string, names: string[], section: string) {
    const categories = names.map((name) => ({ name, parent: parentId }));
    return await this.models[section]?.insertMany(categories, { ordered: false });
  }

  async updateCategory(id: string, updates: any, section: string) {
    return await this.models[section]?.findByIdAndUpdate(id, updates);
  }

  async deleteCategory(id: string, section: string) {
    return await this.models[section]?.findByIdAndDelete(id);
  }
}
