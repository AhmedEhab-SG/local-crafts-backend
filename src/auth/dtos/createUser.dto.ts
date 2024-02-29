import {
  IsAlpha,
  IsDateString,
  IsNotEmpty,
  Length,
  IsEmail,
  IsOptional,
  IsNumberString,
  IsStrongPassword,
  IsObject,
} from 'class-validator';

export class CreateUserDto {
  @IsAlpha()
  @Length(3, 64)
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({ minLength: 8 })
  password: string;

  @IsObject()
  address: string;

  @IsNumberString()
  @Length(11, 11, { message: 'Phone number mush be exactly 11 characters' })
  phone: string;

  @IsDateString()
  @IsOptional()
  createdAt?: string;

  @IsDateString()
  @IsOptional()
  updatedAt?: string;
}
