import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ProductModel } from 'src/mongo/models/product.model';
import { ServiceModel } from 'src/mongo/models/service.model';
import { UserModel } from 'src/mongo/models/user.model';

@Module({
  imports: [UserModel, ServiceModel, ProductModel],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
