import { IsMongoId, IsString } from 'class-validator';

export class VendorNestedDto {
  @IsMongoId()
  _id: string;

  @IsString()
  main: string;

  @IsString()
  gov: string;

  @IsString()
  city: string;
}
