import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductModel } from 'src/mongo/models/products.model';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserModel } from 'src/mongo/models/user.model';

@Module({
  imports: [ProductModel, UserModel],
  controllers: [ProductsController],
  providers: [ProductsService, JwtService, UsersService],
})
export class ProductsModule {}
