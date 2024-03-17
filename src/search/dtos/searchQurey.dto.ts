import { IsNotEmpty, IsString } from 'class-validator';
export class SearchQureyDto {
  @IsString()
  @IsNotEmpty()
  q: string;
}
