import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date } from 'mongoose';
import { Product } from './product.schema';

@Schema()
export class Service extends Product {
  @Prop({ minlength: 0 })
  photos: string[];
}

export const ServicesSchema = SchemaFactory.createForClass(Service);
