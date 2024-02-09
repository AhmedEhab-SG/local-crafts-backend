import { Module } from '@nestjs/common';
import { MongoModule } from './mongo/mongo.module';
import 'dotenv/config';

@Module({
  imports: [MongoModule],
})
export class AppModule {}
