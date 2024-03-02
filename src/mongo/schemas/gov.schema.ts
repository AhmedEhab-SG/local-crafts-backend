import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GovDocument = HydratedDocument<Governorate>;

@Schema()
export class Governorate {
  @Prop({
    unique: true,
    required: true,
    type: String
  })
  name: string;
}

export const GovSchema = SchemaFactory.createForClass(Governorate);
