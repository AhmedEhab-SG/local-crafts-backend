import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date } from 'mongoose';

@Schema()
export class Order {
  @Prop({ type: Object, required: true })
  customer: { name: string; id: string };

  @Prop({ type: Object, required: true })
  vendor: { name: string; id: string };

  @Prop({ type: Object })
  service: { name: string; id: string };

  @Prop({ type: Object })
  product: { name: string; id: string };

  @Prop({ required: true })
  message: string;

  @Prop({ type: Date, default: Date.now, required: true })
  createdAt: Date;

  @Prop({ required: true })
  rating: number;
}

export const OrederSchema = SchemaFactory.createForClass(Order);
