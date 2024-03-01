import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Service, ServicesSchema } from '../schemas/services.schema';

export const serviceModel = MongooseModule.forFeatureAsync([
  { name: Service.name, useFactory: () => ServicesSchema },
]);

@Module({
  imports: [serviceModel],
  exports: [serviceModel],
})
export class ServiceModule {}
