import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './mongo/mongo.module';
import 'dotenv/config';

@Module({
  imports: [MongoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
