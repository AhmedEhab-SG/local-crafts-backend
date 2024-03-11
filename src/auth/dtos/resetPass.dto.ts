import { IsStrongPassword } from "class-validator";
import { EmailCodeDto } from "src/shared/dtos/emailCode.dto";

export class ResetPassDto extends EmailCodeDto {
  @IsStrongPassword({ minLength: 8 })
  password: string
}
