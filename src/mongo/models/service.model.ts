import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServicesSchema } from '../schemas/services.schema';

export const ServiceModel = MongooseModule.forFeatureAsync([
  { name: Service.name, useFactory: () => ServicesSchema },
]);

// @Module({
//   imports: [serviceModel],
//   exports: [serviceModel],
// })
// export class ServiceModule {}
