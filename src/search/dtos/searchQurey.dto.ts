import { IsString } from 'class-validator';
export class SearchQureyDto {
  @IsString()
  q: string;
}
