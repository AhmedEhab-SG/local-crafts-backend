import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { HydratedDocument } from 'mongoose';

export type ServiceDocument = HydratedDocument<Service>;

@Schema()
export class Service extends Product {
  @Prop({ minlength: 0 })
  photos: string[];
}

export const ServicesSchema = SchemaFactory.createForClass(Service);
