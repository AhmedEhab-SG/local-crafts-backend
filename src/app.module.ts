import { Module } from '@nestjs/common';
import { MongoModule } from './mongo/mongo.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { OrdersModule } from './orders/orders.module';
import 'dotenv/config';

@Module({
  imports: [MongoModule, ProductsModule, AuthModule, ServicesModule, OrdersModule],
})
export class AppModule {}
