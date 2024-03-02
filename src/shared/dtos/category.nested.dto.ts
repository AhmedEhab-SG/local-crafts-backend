import { IsMongoId, IsString } from 'class-validator';

export class CategoryNestedDto {
  @IsMongoId()
  _id: string;

  @IsString()
  main: string;

  @IsString()
  sub: string;
}
