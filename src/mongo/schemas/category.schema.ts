import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Governorate } from './gov.schema';

type CategoryDocument = HydratedDocument<Category>;

@Schema()
class Category {
  @Prop({
    required: true,
    type: 'String'
  })
  name: string;

  @Prop({type: 'String'})
  description: string;

  @Prop({type: 'String'})
  photo: string;

  @Prop({
    nullable: true,
    ref: 'Category',
    type: 'String'
  })
  parent: Category;
}

const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.index({ name: 1, parent: 1 }, { unique: true });

export { CategorySchema, Category, CategoryDocument }
