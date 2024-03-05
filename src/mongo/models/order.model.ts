import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../schemas/orders.schema';

export const OrderModel = MongooseModule.forFeatureAsync([
  {
    name: Order.name,
    useFactory: () => {
      OrderSchema.pre('validate', function (next) {
        if (this.product && this.service) {
          next(new Error('order must be for either product or service'));
        }
        next();
      });
      return OrderSchema;
    },
  },
]);
