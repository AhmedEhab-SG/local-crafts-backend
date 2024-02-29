import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductModule } from 'src/mongo/models/products.module';

@Module({
  imports: [ProductModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
