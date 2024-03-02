import {
  ArgumentMetadata,
  BadGatewayException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import mongoose, { ObjectId } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): ObjectId {
    if (!mongoose.Types.ObjectId.isValid(value))
      throw new BadGatewayException('Invalid ObjectId');

    return value;
  }
}
