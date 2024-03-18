import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from 'src/mongo/schemas/service.schema';
import { Model } from 'mongoose';
import { Product } from 'src/mongo/schemas/product.schema';
import { User } from 'src/mongo/schemas/user.schema';
import { SearchQureyDto } from './dtos/searchQurey.dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<Service>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async search(q: string): Promise<any> {
    const products = await this.productModel.find();

    const services = await this.serviceModel.find();

    const users = await this.userModel.find(
      { role: 'vendor' },
      { password: 0 },
    );

    const allCollections = { products, services, users };

    const allCollectionsMapped = Object.entries(allCollections).map(
      ([collectionName, collectionArr]) => {
        const mappedValue = (collectionArr as any[])
          .map((item) => {
            for (const key in item) {
              if (key === '_id') continue; // skip the id
              if (item[key] && typeof item[key] === 'string') {
                if (item[key].toLowerCase().includes(q.toLowerCase())) {
                  return item;
                }
                return;
              }
            }
          })
          .filter(Boolean); // to fitler out undefined values
        return { [collectionName]: mappedValue };
      },
    );
    return Object.assign({}, ...allCollectionsMapped); // remvoe the array and merge the objects for as request frontend
  }
}
