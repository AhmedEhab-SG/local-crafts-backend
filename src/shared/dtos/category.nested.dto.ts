import { IsString } from 'class-validator';

export class CategoryNestedDto {
  @IsString()
  main: string;

  @IsString()
  sub: string;
}
