import { ApiDefaultResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { UsersService } from './users.service';
import {
  errorDebug,
  response400,
  default_msg_400,
} from './../../app/lib/response';
import { Param } from '@nestjs/common/decorators';
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly services: UsersService) {}

  @Get('/')
  async findAllUsers() {
    try {
      return this.services.getAllUsers();
    } catch (error) {
      return errorDebug(error);
    }
  }

  @Get('/findByUserID/:user_id')
  async findById(@Param('user_id') user_id: string) {
    try {
      if (!user_id) return { ...response400('missing parameter user_id') };
      const user = await this.services.getById(user_id);
      return user;
    } catch (error) {
      return errorDebug(error);
    }
  }

  @Get('/findByEmail/:email')
  async findByEmail(@Param('email') email: string) {
    try {
      if (!email) return { ...response400('missing parameter email') };
      const user = await this.services.findByEmail(email);
      return user;
    } catch (error) {
      return errorDebug(error);
    }
  }

  @Get('/findByUsername/:username')
  async findByUsername(@Param('username') username: string) {
    try {
      const users = await this.services.findByUsername(username);
      return users;
    } catch (error) {
      return errorDebug(error);
    }
  }
}
