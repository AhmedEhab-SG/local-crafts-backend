import { Module } from '@nestjs/common';
import { MongoModule } from './mongo/mongo.module';
import { ProductsModule } from './products/products.module';
import 'dotenv/config';

@Module({
  imports: [MongoModule, ProductsModule],
})
export class AppModule {}
