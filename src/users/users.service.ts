import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/mongo/schemas/user.schema';
import { UpdateUserDto } from './dtos/updateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async find(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(_id: string): Promise<User> {
    return await this.userModel.findById({ _id }).exec();
  }

  async update(_id: string, user: UpdateUserDto): Promise<User> {
    const tagertUser = await this.userModel.findById({ _id }).exec();

    if (user?.password && user?.newPassword) {
      const passwordMatches = await bcrypt.compare(
        user.password,
        tagertUser.password,
      );

      if (!passwordMatches) {
        throw new BadRequestException('Invalid password');
      }

      user.password = await bcrypt.hash(user.newPassword, 10);
      return await this.userModel.findByIdAndUpdate({ _id }, user).exec();
    }

    return await this.userModel.findByIdAndUpdate(
      { _id },
      { ...user, password: tagertUser.password },
    );
  }

  async delete(_id: string): Promise<User> {
    const deletedUser = await this.userModel.findOneAndDelete({ _id }).exec();

    if (!deletedUser) throw new NotFoundException('No user found by this id');

    return deletedUser;
  }
}
