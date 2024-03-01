import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dtos/userRegister.dto';
import { UserLoginDto } from './dtos/userLogin.dto';

@Controller('auth')
export class AuthController {
  constructor (private authService: AuthService) {}

  @Post('login')
  login (@Body() user: UserLoginDto) {
    return  this.authService.login(user);
  }

  @Post('register')
  async register (@Body() user: UserRegisterDto){
    await this.authService.register(user);
  }
}
