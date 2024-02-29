import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Governorate } from './gov.schema';

type CityDocument = HydratedDocument<City>;

@Schema()
class City {
  @Prop({
    required: true
  })
  name: string;

  @Prop({
    required: true,
    ref: 'Governorate',
    type: 'String'
  })
  gov: Governorate;
}

const CitySchema = SchemaFactory.createForClass(City);
CitySchema.index({ gov: 1, name: 1 }, { unique: true });

export { CitySchema, City, CityDocument }
