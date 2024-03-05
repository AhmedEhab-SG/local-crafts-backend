import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServicesSchema } from '../schemas/service.schema';

export const ServiceModel = MongooseModule.forFeatureAsync([
  { name: Service.name, useFactory: () => ServicesSchema },
]);

// @Module({
//   imports: [serviceModel],
//   exports: [serviceModel],
// })
// export class ServiceModule {}
