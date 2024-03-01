import { Model } from 'mongoose';
import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Governorate } from 'src/mongo/schemas/gov.schema';
import { City } from 'src/mongo/schemas/city.schema';
import { User } from 'src/mongo/schemas/user.schema';
import { UserRegisterDto } from './dtos/userRegister.dto';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dtos/userLogin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(City.name) private cityModel: Model<City>,
    @InjectModel(Governorate.name) private govModel: Model<Governorate>,
    private jwtService: JwtService
  ) { }

  async login(userData: UserLoginDto) {
    try {
      const user = await this.userModel.findOne({ email: userData.email });
      const ok = await bcrypt.compare(userData.password, user.password)
      if (!user || !ok) throw new Error('Invalid credentials');

      const payload = { email: user.email, sub: user._id };
      return {
        access_token: this.jwtService.sign(payload, {
          expiresIn: process.env.JWT_EXPIRE, secret: process.env.JWT_SECRET
        }),
      };
    }
    catch {
      throw new HttpException('Invalid credentials', 401);
    }
  }

  async register(user: UserRegisterDto) {
    user.password = await bcrypt.hash(user.password, 10);
    try {
      await this.userModel.create(user)
    }
    catch (err) {
      console.log(err);
      throw new ForbiddenException('User already exists!');
    }
  }
}
