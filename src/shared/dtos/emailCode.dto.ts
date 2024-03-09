import { IsEmail, IsNumber, Min, Max } from 'class-validator';

export class EmailCodeDto {
  @IsEmail()
  email: string;

  @IsNumber()
  @Min(10000, { message: 'Code must be 5 digits' })
  @Max(99999, { message: 'Code must be 5 digits' })
  code: number;
}
