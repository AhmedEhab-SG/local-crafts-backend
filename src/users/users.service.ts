import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
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

  async update(
    _id: string,
    user: UpdateUserDto,
    reqUserId: string,
  ): Promise<User> {
    const requestedUser = await this.userModel
      .findById({ _id: reqUserId })
      .exec();

    //most IMPORTANT Validation
    if (requestedUser.role !== 'admin' && _id !== reqUserId)
      throw new UnauthorizedException(
        'You are not authorized to update this user',
      );

    const targetUser = await this.userModel.findById(_id).exec();

    if (user.password || user.newPassword) {
      if (
        (!user.password || !user.newPassword) &&
        requestedUser.role !== 'admin'
      ) {
        throw new BadRequestException(
          'You must provide the current password and the new password',
        );
      }

      if (requestedUser.role !== 'admin') {
        const passwordMatches = await bcrypt.compare(
          user.password,
          targetUser.password,
        );

        if (!passwordMatches) {
          throw new BadRequestException('Invalid current password');
        }
      }

      user.password = await bcrypt.hash(user.newPassword, 10);
    }

    return await this.userModel
      .findOneAndUpdate({ _id }, { ...user, _id })
      .exec();
  }

  async delete(_id: string): Promise<User> {
    const deletedUser = await this.userModel.findOneAndDelete({ _id }).exec();

    if (!deletedUser) throw new NotFoundException('No user found by this id');

    return deletedUser;
  }
}
