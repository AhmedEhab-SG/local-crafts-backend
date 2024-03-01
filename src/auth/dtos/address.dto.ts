import { IsOptional, IsMongoId, IsString } from 'class-validator';

export class AddressDto {
  @IsString()
  gov: string

  @IsString()
  city: string

  @IsMongoId()
  cityId: string

  @IsOptional()
  street: string
}
