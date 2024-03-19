import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from 'src/mongo/schemas/service.schema';
import { Model, QueryOptions } from 'mongoose';
import { Product } from 'src/mongo/schemas/product.schema';
import { User } from 'src/mongo/schemas/user.schema';


@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<Service>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) { }

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
        const mappedValue = (collectionArr as Array<any>)
          .map((item) => {
            for (const key in item) {
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

    return allCollectionsMapped;
  }

  async searchExact(q: string) {
    // const opt: QueryOptions = { $text: { $search: q } }
    const opt: QueryOptions = {
      $search: {
        text: {
          query: q,
          path: ['name', 'description'],
          fuzzy: { maxEdits: 2 }
        }
      }
    }
    const data = {
      services: await this.serviceModel.find(opt),
      products: await this.productModel.find(opt)
    }
    return data
  }

  async popularItems(limit = 6) {
    limit = Number(limit);
    if (!limit || limit < 1) limit = 6;
    return {
      services: await this.serviceModel.find()
        .sort({ createdAt: -1 }).limit(limit),
      products: await this.productModel.find()
        .sort({ createdAt: -1 }).limit(limit)
    }
  }
}
