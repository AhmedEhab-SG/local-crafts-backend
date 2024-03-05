import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dtos/userRegister.dto';
import { UserLoginDto } from './dtos/userLogin.dto';
import { VendorRegisterDto } from './dtos/vendorRegister.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() user: UserLoginDto) {
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() user: UserRegisterDto) {
    await this.authService.register(user);
  }

  @Post('register/vendor')
  async registerVendor(@Body() user: VendorRegisterDto) {
    await this.authService.registerVendor(user);
  }
}
