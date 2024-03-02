import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { ServiceModule } from 'src/mongo/models/service.module';

@Module({
  imports: [ServiceModule],
  providers: [ServicesService],
  controllers: [ServicesController],
})
export class ServicesModule {}
