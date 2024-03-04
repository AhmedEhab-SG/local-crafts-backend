import {
  IsIn,
  IsNotEmpty,
  Length,
  IsObject,
  IsOptional,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserLoginDto } from './userLogin.dto';
import { AddressDto } from './address.dto';

export class UserRegisterDto extends UserLoginDto {
  @IsIn(['customer', 'vendor'])
  role: string;

  @Length(2, 64)
  @IsNotEmpty()
  name: string;

  @IsOptional()
  photo: string;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @Length(3, 512)
  description: string;
}
