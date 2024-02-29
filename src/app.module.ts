import { Module } from '@nestjs/common';
import { MongoModule } from './mongo/mongo.module';
import { ProductsModule } from './prodcuts/prodcuts.module';
import 'dotenv/config';

@Module({
  imports: [MongoModule, ProductsModule],
})
export class AppModule {}
