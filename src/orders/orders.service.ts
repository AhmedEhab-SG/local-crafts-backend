import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions } from 'mongoose';
import { Order } from 'src/mongo/schemas/orders.schema';
import { UpdateOrderDto } from './dtos/updateOrder.dto';
import { Service } from 'src/mongo/schemas/service.schema';
import { Product } from 'src/mongo/schemas/product.schema';
import { PaginatedDto } from 'src/shared/dtos/paginated.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<Service>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) { }

  async getAll(options = {}, page: number, limit: number) {
    const all = await this.orderModel.find(options)
      .skip((page - 1) * limit).limit(limit)
      .populate([
        { path: 'customer', select: 'name' },
        { path: 'vendor', select: 'name' },
        { path: 'service', select: '-vendor -approved -__v' },
        { path: 'product', select: '-vendor -approved -__v' },
      ]);

    return new PaginatedDto<Order>(all, page, limit, all.length);
  }


  async getOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id)
      .populate([
        { path: 'customer', select: 'name' },
        { path: 'vendor', select: 'name' },
        { path: 'service', select: '-vendor -approved -__v' },
        { path: 'product', select: '-vendor -approved -__v' },
      ]);
    if (!order) {
      throw new NotFoundException();
    } else {
      return order;
    }
  }

  async create(orderData: Order): Promise<Order> {
    const model = orderData.service ? this.serviceModel : this.productModel;
    const target = await model.findById(orderData.service || orderData.product);
    if (!target?.vendor?.id) throw new NotFoundException();
    orderData.vendor = target.vendor.id;
    target.totalOrders++;
    target.save();
    return await this.orderModel.create(orderData);
  }

  async delete(_id: string, options = {}): Promise<any> {
    return await this.orderModel.deleteOne({ _id, ...options });
  }

  async update(_id: string, orderData: UpdateOrderDto): Promise<Order> {
    const order = await this.orderModel.findOneAndUpdate({ _id }, orderData);
    if (!order) {
      throw new NotFoundException('not found order');
    } else {
      return order;
    }
  }



  async search(q: string) {
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
}
