import { IsOptional, IsMongoId, IsString } from 'class-validator';

export class AddressDto {
  @IsString()
  gov: string;

  @IsString()
  city: string;

  @IsOptional()
  street: string;
}
