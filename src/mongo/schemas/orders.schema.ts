import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date } from 'mongoose';

@Schema()
export class Order {
  @Prop({
    required: true,
    ref: 'User',
    type: String,
  })
  customer: string;

  @Prop({
    required: true,
    ref: 'User',
    type: String,
  })
  vendor: string;

  @Prop({
    ref: 'Service',
    type: String,
  })
  service: string;

  @Prop({
    ref: 'Product',
    type: String,
  })
  product: string;

  @Prop()
  message: string;

  @Prop()
  phone: string;

  @Prop({ type: Date, default: Date.now, required: true })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
