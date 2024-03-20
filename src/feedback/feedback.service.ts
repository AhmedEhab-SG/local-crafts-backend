import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback } from 'src/mongo/schemas/feedback.schema';
// import { Order } from 'src/mongo/schemas/orders.schema';
import { Product } from 'src/mongo/schemas/product.schema';
import { Service } from 'src/mongo/schemas/service.schema';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<Service>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    // @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Feedback.name) private feedbackModel: Model<Feedback>,
  ) {}

  async find(option: any): Promise<Feedback[]> {
    return await this.feedbackModel.find(option);
  }

  async create(feedbackData: Feedback): Promise<Feedback> {
    const model = feedbackData.service ? this.serviceModel : this.productModel;
    const target = await model.findOne({
      _id: feedbackData.service || feedbackData.product,
    });
    if (!target?.vendor?.id) throw new NotFoundException();
    feedbackData.vendor = target.vendor.id;
    target.totalReviews++;
    try {
      target.avgRating += feedbackData.rating / target.totalReviews;
      if (target.avgRating > 5) throw new Error();
    } catch {
      target.avgRating = 5;
    }
    target.save();
    return await this.feedbackModel.create(feedbackData);
  }

  async remove(option: any): Promise<any> {
    return await this.feedbackModel.deleteOne(option);
  }
}
