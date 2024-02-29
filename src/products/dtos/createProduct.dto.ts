import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
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
  readonly category: { main: string; sub: string; _id: string };

  @IsObject()
  @IsNotEmpty()
  readonly vendor: { main: string; _id: string; address: string };
}
