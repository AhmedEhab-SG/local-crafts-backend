import { Module } from '@nestjs/common';
import { MongoModule } from './mongo/mongo.module';
import { AuthModule } from './auth/auth.module';
import 'dotenv/config';

@Module({
  imports: [MongoModule, AuthModule],
})
export class AppModule {}
