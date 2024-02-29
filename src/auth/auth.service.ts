import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Governorate } from 'src/mongo/schemas/gov.schema';
import { City } from 'src/mongo/schemas/city.schema';
import { User } from 'src/mongo/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(City.name) private cityModel: Model<City>,
    @InjectModel(Governorate.name) private govModel: Model<Governorate>
  ) {}

  login () {
    return 'login';
  }
  register () {
  }
}
