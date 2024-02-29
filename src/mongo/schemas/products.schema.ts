import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date } from 'mongoose';

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, minlength: 1 })
  photos: string[];

  @Prop({ type: Object, required: true })
  category: { main: string; sub: string; _id: string };

  @Prop({ type: Object, required: true })
  vendor: { main: string; _id: string; address: string };

  @Prop({ default: 0 })
  totalOrders: number;

  @Prop({ max: 5, default: 0 })
  avgRating: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ default: false })
  approved: boolean;
}

export const ProductsSchema = SchemaFactory.createForClass(Product);
