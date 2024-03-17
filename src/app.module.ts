import { Module } from '@nestjs/common';
import { MongoModule } from './mongo/mongo.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { LocationsModule } from './locations/locations.module';
import { ServicesModule } from './services/services.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    MongoModule,
    AuthModule,
    CategoriesModule,
    LocationsModule,
    ProductsModule,
    ServicesModule,
    UsersModule,
    OrdersModule,
    SearchModule
  ],
})
export class AppModule {}
