import { AuthGuard } from 'src/shared/guards/auth.guard';
import { UsersService } from './users.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/guards/roles.decorator';
import { ParseObjectIdPipe } from 'src/shared/pipes/parseObjectId.pipe';
import { User } from 'src/mongo/schemas/user.schema';

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
}
