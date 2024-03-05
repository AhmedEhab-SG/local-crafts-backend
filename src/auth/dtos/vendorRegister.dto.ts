import {
  Length,
  IsObject,
  IsOptional,
  ValidateNested,
  IsNotEmptyObject,
  IsMongoId,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from './address.dto';

export class VendorRegisterDto {
  @IsMongoId()
  id: string;

  @IsOptional()
  @IsUrl()
  photo: string;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @Length(3, 512)
  description: string;
}
