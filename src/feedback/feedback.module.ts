import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { OrderModel } from 'src/mongo/models/order.model';
import { ServiceModel } from 'src/mongo/models/service.model';
import { ProductModel } from 'src/mongo/models/product.model';
import { FeedbackModel } from 'src/mongo/models/feedback.model';

@Module({
  imports: [OrderModel, ServiceModel, ProductModel, FeedbackModel],

  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
