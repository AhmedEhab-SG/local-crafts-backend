import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderModel } from 'src/mongo/models/order.model';

@Module({
  imports: [OrderModel],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
