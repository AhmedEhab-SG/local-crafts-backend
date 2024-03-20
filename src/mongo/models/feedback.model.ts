import { MongooseModule } from '@nestjs/mongoose';
import { Feedback, FeedbackSchema } from '../schemas/feedback.schema';

export const FeedbackModel = MongooseModule.forFeatureAsync([
  {
    name: Feedback.name,
    useFactory: () => {
      FeedbackSchema.pre('validate', function (next) {
        if (this.product && this.service) {
          next(new Error('feedback must be for either product or service'));
        }
        next();
      });
      return FeedbackSchema;
    },
  },
]);
