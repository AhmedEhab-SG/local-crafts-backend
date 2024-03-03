import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { ServiceModel } from 'src/mongo/models/service.model';

@Module({
  imports: [ServiceModel],
  providers: [ServicesService],
  controllers: [ServicesController],
})
export class ServicesModule {}
