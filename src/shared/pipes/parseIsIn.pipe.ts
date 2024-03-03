import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIsInPipe implements PipeTransform {
  constructor (private items: string[]) {}

  transform(value: string): string {
    if (!this.items.includes(value))
      throw new NotFoundException();
    return value;
  }
}
