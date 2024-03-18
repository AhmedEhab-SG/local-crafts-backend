import { Body, Controller, Get, NotAcceptableException, Post, Query, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dtos/userRegister.dto';
import { UserLoginDto } from './dtos/userLogin.dto';
import { EmailCodeDto } from '../shared/dtos/emailCode.dto';
import { ResetPassDto } from './dtos/resetPass.dto';
import { SendCodeDto } from './dtos/sendCode.dto';

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
      throw new NotAcceptableException('Invalid informations');
    }
  }

  @Get('code')
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { ttl: 30000, limit: 1 } })
  async sendCodeToEmail(
    @Query() { email, type }: SendCodeDto,
  ) {
    return await this.authService.sendConfirmation(email, type);
  }

  @Post('reset-password')
  async resetPass(@Body() data: ResetPassDto) {
    try {
      return await this.authService.resetPassword(data);
    }
    catch {
      throw new NotAcceptableException('Invalid informations');
    }
  }
}
