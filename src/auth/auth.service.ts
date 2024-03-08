import { Model } from 'mongoose';
import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/mongo/schemas/user.schema';
import { UserRegisterDto } from './dtos/userRegister.dto';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dtos/userLogin.dto';
import { JwtService } from '@nestjs/jwt';
import { VendorRegisterDto } from './dtos/vendorRegister.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  currentMails = {};
  constructor(
    private readonly mailService: MailerService,
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }

  async login(userData: UserLoginDto) {
    try {
      const user = await this.userModel.findOne({ email: userData.email });
      const ok = await bcrypt.compare(userData.password, user.password);
      if (!user || !ok) throw new Error('Invalid credentials');

      const payload = { email: user.email, sub: user._id };
      return {
        user: { ...user['_doc'], password: undefined },
        access_token: this.jwtService.sign(payload, {
          expiresIn: process.env.JWT_EXPIRE,
          secret: process.env.JWT_SECRET,
        }),
      };
    } catch {
      throw new HttpException('Invalid credentials', 401);
    }
  }

  async register(user: UserRegisterDto) {
    user.password = await bcrypt.hash(user.password, 10);
    try {
      await this.userModel.create(user);
      await this.sendConfirmationCode(user.email);
    } catch (err) {
      console.log(err);
      throw new ForbiddenException('User already exists!');
    }
  }

  async registerVendor(user: VendorRegisterDto) {
    return await this.userModel.findByIdAndUpdate(user.id, user);
  }

  private async sendConfirmationCode(email: string) {
    const code = Math.floor(15000 + Math.random() * 80000);
    this.currentMails[email] = code;
    const info = await this.mailService.sendMail({
      from: "mailer@workers.com",
      sender: "Workers",
      to: email,
      subject: 'Welcome to WORKERS platform',
      text: "To confirm your email, please use the following code: " + code,
    })
    console.log(info);
  }

  async confirmEmail(email: string, code: number) {
    if (this.currentMails[email] === code) {
      delete this.currentMails[email];
      return true;
    }
    return false;
  }
}
