import { IsBoolean, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { CreateServiceDto } from './createService.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'total orders should be at least 0' })
  totalOrders: number;

  @IsOptional()
  @Max(5, { message: 'Average rating should be at most 5' })
  avgRating: number;

  @IsOptional()
  @IsBoolean()
  approved: boolean;
}
