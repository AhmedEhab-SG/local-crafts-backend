import {
  IsNotEmpty,
  IsString,
  Length
} from 'class-validator';

export class MainCategoryDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 500)
  description: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  photo: string;
}
