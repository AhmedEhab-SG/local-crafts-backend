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

  @Prop({
    type: {
      _id: false,
      main: String,
      sub: String,
    },
    required: true,
  })
  category: { main: string; sub: string };

  @Prop({
    type: {
      _id: false,
      id: {
        ref: 'User',
        type: String,
      },
      name: String,
      gov: {
        ref: 'Governorate',
        type: String,
      },
      city: {
        ref: 'City',
        type: String,
      },
    },
    required: true,
  })
  vendor: { id: string; name: string; gov: string; city: string };

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
