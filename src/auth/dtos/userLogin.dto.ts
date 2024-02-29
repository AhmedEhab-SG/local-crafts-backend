import {
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';

export class UserLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword({ minLength: 8 })
  password: string;
}
