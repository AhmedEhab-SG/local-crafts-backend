import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderModel } from 'src/mongo/models/order.model';
import { ServiceModel } from 'src/mongo/models/service.model';
import { ProductModel } from 'src/mongo/models/product.model';

@Module({
  imports: [OrderModel, ServiceModel, ProductModel],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
