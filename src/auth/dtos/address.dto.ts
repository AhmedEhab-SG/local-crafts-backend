import { IsOptional, IsMongoId } from 'class-validator';

export class AddressDto {
  @IsMongoId()
  gov: string;

  @IsMongoId()
  city: string;

  @IsOptional()
  street: string;
}
