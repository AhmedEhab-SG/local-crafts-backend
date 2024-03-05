import { AuthGuard } from 'src/shared/guards/auth.guard';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { ParseObjectIdPipe } from 'src/shared/pipes/parseObjectId.pipe';
import { User } from 'src/mongo/schemas/user.schema';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  async getAllUsers() {
    return await this.usersService.find();
  }

  @Get(':_id')
  @UseGuards(AuthGuard)
  async getUserById(
    @Param('_id', ParseObjectIdPipe) _id: string,
  ): Promise<User> {
    return await this.usersService.findById(_id);
  }

  @Patch(':_id')
  @UseGuards(AuthGuard)
  async updateUser(
    @Param('_id', ParseObjectIdPipe) _id: string,
    @Body() user: UpdateUserDto,
    @Request() request: { user_id: string },
  ): Promise<User> {
    return await this.usersService.update(_id, user, request.user_id);
  }

  @Delete(':_id')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  async deleteUser(
    @Param('_id', ParseObjectIdPipe) _id: string,
  ): Promise<User> {
    return await this.usersService.delete(_id);
  }
}
