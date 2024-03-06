import {
  IsIn,
  IsNotEmpty,
  Length,
  IsObject,
  IsOptional,
  ValidateNested,
  IsNotEmptyObject,
  IsString,
  ValidateIf,
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

  @IsString()
  @Length(3, 64)
  @ValidateIf((o) => o.role === 'vendor')
  job: string;

  @IsString()
  @Length(3, 64)
  @ValidateIf((o) => o.role === 'vendor')
  phone: string;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AddressDto)
  @ValidateIf((o) => o.role === 'vendor')
  address: AddressDto;

  @Length(3, 512)
  @IsOptional()
  @ValidateIf((o) => o.role === 'vendor')
  description: string;
}
