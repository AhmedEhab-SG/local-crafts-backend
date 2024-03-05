import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { CategoryNestedDto } from 'src/shared/dtos/category.nested.dto';
import { VendorNestedDto } from 'src/shared/dtos/vendor.nested.dto';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: 'price should be at least 1' })
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1, { message: 'length of photos should be at least 1' })
  readonly photos: string[];

  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CategoryNestedDto)
  readonly category: CategoryNestedDto;
}
