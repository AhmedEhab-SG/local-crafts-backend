import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrederSchema } from '../schemas/orders.schema';

export const OrderModel = MongooseModule.forFeatureAsync([
  {
    name: Order.name,
    useFactory: () => OrederSchema,
  },
]);
