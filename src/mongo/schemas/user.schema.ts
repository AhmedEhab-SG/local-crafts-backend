import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    required: true,
    minlength: 2,
    maxlength: 64
  })
  name: string;

  @Prop({
    unique: true,
    required: true
  })
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: string

  @Prop({
    type: {
      _id: false,
      gov: {
        ref: 'Governorate',
        type: String,
      },
      city: {
        ref: 'City',
        type: String,
      },
      street: String
    }
  })
  address: {
    gov: string;
    city: string;
    street: string;
  }

  @Prop()
  photo: string;

  @Prop()
  description: string;

  @Prop()
  phone: string;

  @Prop()
  job: string;

  @Prop({ type: Date, default: Date.now, required: true })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
