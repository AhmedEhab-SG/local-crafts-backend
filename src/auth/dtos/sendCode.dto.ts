import { IsEmail, IsIn } from "class-validator";

export class SendCodeDto {
  @IsEmail()
  email: string;

  @IsIn(['password', 'email'])
  type: string;
}
