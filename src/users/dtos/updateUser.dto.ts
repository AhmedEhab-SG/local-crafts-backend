import { IsEmpty, IsOptional, IsStrongPassword } from 'class-validator';
import { UserRegisterDto } from 'src/auth/dtos/userRegister.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(UserRegisterDto) {
  @IsEmpty()
  email: string;

  @IsOptional()
  @IsStrongPassword({ minLength: 8 })
  newPassword: string;
}
