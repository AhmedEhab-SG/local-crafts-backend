import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateOrderDto {
  @IsObject()
  @IsNotEmpty()
  readonly customer: { name: string; id: string };

  @IsObject()
  @IsNotEmpty()
  readonly vendor: { name: string; id: string };

  @IsObject()
  @IsNotEmpty()
  readonly service: { name: string; id: string };

  @IsObject()
  @IsNotEmpty()
  readonly product: { name: string; id: string };

  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @IsDate()
  readonly createdAt: string;

  @IsNumber()
  @IsOptional()
  @Length(0, 5, { message: 'pleas give a rate' })
  readonly rating: number;

  @IsNumber()
  @IsOptional()
  @IsIn(['opened', 'accepted', 'closed'])
  readonly status: number;
}
