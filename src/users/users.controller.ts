import {
  ApiBody,
  ApiDefaultResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, Post, Req } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { UsersService } from './users.service';
import {
  errorDebug,
  response400,
  default_msg_400,
} from './../../app/lib/response';
import { Body, Delete, Param, Patch } from '@nestjs/common/decorators';
import { Request } from 'express';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly services: UsersService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all active user' })
  async findAllUsers() {
    try {
      return this.services.getAllUsers();
    } catch (error) {
      return errorDebug(error);
    }
  }

  @Get('/findByUserID/:user_id')
  @ApiOperation({ summary: 'Get single user by user_id' })
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
  @ApiOperation({ summary: 'Get single user by email' })
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
  @ApiOperation({ summary: 'Get many user by username' })
  async findByUsername(@Param('username') username: string) {
    try {
      const users = await this.services.findByUsername(username);
      return users;
    } catch (error) {
      return errorDebug(error);
    }
  }

  @Post('/')
  @ApiOperation({ summary: 'Create new record' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'your_username',
          description: 'your username',
        },
        email: {
          type: 'string',
          example: 'your_email@gmail.com',
          description: 'email is unique',
        },
        password: {
          type: 'string',
          example: 'secret',
          description: 'plaintext no encryption',
        },
      },
    },
  })
  async store(@Body() createUserDto: CreateUserDto) {
    try {
      const store = await this.services.storeUser({ ...createUserDto });
      return store;
    } catch (error) {
      return errorDebug(error);
    }
  }

  @Delete('/:user_id')
  @ApiOperation({ summary: 'Delete user using soft delete' })
  async delete(@Param('user_id') user_id: string) {
    try {
      const deleted_user = await this.services.delete(user_id);
      return deleted_user;
    } catch (error) {
      return errorDebug(error);
    }
  }

  @Patch('/:user_id')
  @ApiOperation({
    summary: 'update record',
    description: 'fields are optional',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          title: 'username',
          type: 'string',
          example: 'new_username',
          description: 'this field is optional.',
        },
        email: {
          title: 'email',
          type: 'string',
          example: 'new_email@mail.com',
          description: 'this field is optional.',
        },
        password: {
          title: 'password',
          type: 'string',
          example: 'new_password',
          description: 'this field is optional. plaintext',
        },
        is_banned: {
          title: 'is_banned',
          type: 'boolean',
          example: true,
          description:
            'this field is optional. user indication that failed to login',
        },
        is_active: {
          title: 'is_banned',
          type: 'boolean',
          example: true,
          description:
            'this field is optional. this field indicate user are deleted',
        },
        banned_for: {
          title: 'banned_for',
          type: 'string',
          example: `${new Date().valueOf()}`,
          description: 'this field is optional. use eppoch time',
        },
      },
    },
  })
  async update(
    @Param('user_id') user_id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const { username, email, password, is_banned, is_active, banned_for } =
        updateUserDto;
      if (!user_id)
        return new HttpException(
          'missing parameter user_id',
          HttpStatus.BAD_REQUEST,
        );
      if (!Boolean(Object.entries(updateUserDto).length))
        return new HttpException('Empty request', HttpStatus.BAD_REQUEST);
      const user = await this.services.update({
        user_id,
        username,
        email,
        password,
        is_banned,
        is_active,
        banned_for,
      });
      return user;
    } catch (error) {
      return errorDebug(error);
    }
  }
}
