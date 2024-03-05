import { IsMongoId, IsString } from 'class-validator';

export class VendorNestedDto {
  @IsString()
  name: string;

  @IsString()
  @IsMongoId()
  gov: string;

  @IsString()
  @IsMongoId()
  city: string;
}
