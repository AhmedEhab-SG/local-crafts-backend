import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, model } from 'mongoose';
import { Order } from 'src/mongo/schemas/orders.schema';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { UpdateOrderDto } from './dtos/updateOrder.dto';
import { Service } from 'src/mongo/schemas/service.schema';
import { Product } from 'src/mongo/schemas/product.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<Service>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}

  async getAll(options = {}): Promise<Order[]> {
    return await this.orderModel.find(options);
  }

  async getOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException();
    } else {
      return order;
    }
  }

  async create(orderData: Order): Promise<Order> {
    // check that the data is there in the db
    const model = orderData.service ? this.serviceModel : this.productModel;
    const target = await model.findById(orderData.service || orderData.product);
    if (!target?.vendor?.id) throw new NotFoundException();
    orderData.vendor = target.vendor.id;
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
}
