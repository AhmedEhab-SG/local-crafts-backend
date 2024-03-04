import { Module } from '@nestjs/common';
import { MongoModule } from './mongo/mongo.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { LocationsModule } from './locations/locations.module';
import { ServicesModule } from './services/services.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import 'dotenv/config';

@Module({
  imports: [
    MongoModule,
    AuthModule,
    CategoriesModule,
    LocationsModule,
    ProductsModule,
    ServicesModule,
    UsersModule,
  ],
})
export class AppModule {}
