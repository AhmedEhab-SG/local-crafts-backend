import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from 'src/mongo/schemas/user.schema';
import { UserRegisterDto } from './dtos/userRegister.dto';
import { UserLoginDto } from './dtos/userLogin.dto';

import { MailingService } from 'src/shared/mailer/mailing.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly mailingService: MailingService,
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }

  async login(userData: UserLoginDto) {
    try {
      const user = await this.userModel.findOne({ email: userData.email });
      const ok = await bcrypt.compare(userData.password, user.password);
      if (!user || !ok) throw new Error();
      if (user.notApproved) {
        return { user: { email: user.email, notApproved: true } }
      }
      return await this.generateToken(user);
    } catch {
      throw new HttpException('Invalid credentials', 401);
    }
  }

  async register(user: UserRegisterDto) {
    user.password = await bcrypt.hash(user.password, 10);
    try {
      await this.userModel.create(user);
      this.mailingService.sendCode(user.email);
      return { user: { email: user.email, notApproved: true } };
    } catch (err) {
      console.log(err);
      throw new ForbiddenException('User already exists!');
    }
  }

  private async generateToken(user: UserDocument) {
    const payload = { email: user.email, sub: user._id };
    return {
      user: { ...user['_doc'], password: undefined },
      access_token: this.jwtService.sign(payload, {
        expiresIn: process.env.JWT_EXPIRE,
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async approveUser(email: string, code: number) {
    if (this.mailingService.validateCode(email, code)) {
      const user = await this.userModel
        .findOneAndUpdate({ email }, { $unset: { notApproved: 1 } });
      if (!user) throw new Error();
      delete user['_doc']['notApproved'];
      return this.generateToken(user);
    }
    throw new Error();
  }
}
