import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { ServiceModel } from 'src/mongo/models/service.model';

@Module({
  imports: [ServiceModel],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
