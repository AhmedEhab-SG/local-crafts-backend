import { Body, Controller, NotAcceptableException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dtos/userRegister.dto';
import { UserLoginDto } from './dtos/userLogin.dto';
import { EmailCodeDto } from '../shared/dtos/emailCode.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  login(@Body() user: UserLoginDto) {
      return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() user: UserRegisterDto) {
    try {
      return await this.authService.register(user);
    } catch (err) {
      throw new NotAcceptableException(err);
    }
  }

  @Post('confirm')
  async confirmEmail(@Body() { email, code }: EmailCodeDto) {
    try {
      return await this.authService.approveUser(email, code);
    } catch (err) {
      throw new NotAcceptableException("Invalid information provided!");
    }
  }
}
