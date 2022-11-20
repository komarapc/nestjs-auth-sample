import {
  ApiBearerAuth,
  ApiBody,
  ApiDefaultResponse,
  ApiHeader,
  ApiHeaders,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, Post, Req } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { UsersService } from './users.service';
import ResponseJSON, {
  errorDebug,
  response400,
  default_msg_400,
} from '../../lib/response';
import {
  Body,
  Delete,
  Param,
  Patch,
  Res,
  Headers,
} from '@nestjs/common/decorators';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { HttpStatus } from '@nestjs/common/enums';
import { Request, Response } from 'express';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly services: UsersService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all active user' })
  async findAllUsers(
    // @Headers('authorization') authorization: string,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    try {
      // console.log({ authorization });
      const users: ResponseJSON = await this.services.getAllUsers();
      res.status(users.statusCode).send(users);
    } catch (error) {
      res.status(400).send(errorDebug(error));
    }
  }

  @Get('/findByUserID/:user_id')
  @ApiOperation({ summary: 'Get single user by user_id' })
  async findById(
    @Param('user_id') user_id: string,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    try {
      if (!user_id)
        res.status(400).send({ ...response400('missing parameter user_id') });
      const user: ResponseJSON = await this.services.getById(user_id);
      res.status(user.statusCode).send(user);
    } catch (error) {
      res.status(400).send(errorDebug(error));
    }
  }

  @Get('/findByEmail/:email')
  @ApiOperation({ summary: 'Get single user by email' })
  async findByEmail(@Param('email') email: string, @Res() res: Response) {
    try {
      if (!email)
        res.status(400).send({ ...response400('missing parameter email') });
      const user: ResponseJSON = await this.services.findByEmail(email);
      res.status(user.statusCode).send(user);
    } catch (error) {
      res.status(400).send(errorDebug(error));
    }
  }

  @Get('/findByUsername/:username')
  @ApiOperation({ summary: 'Get many user by username' })
  async findByUsername(
    @Param('username') username: string,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    try {
      const users: ResponseJSON = await this.services.findByUsername(username);
      res.status(users.statusCode).send(users);
    } catch (error) {
      res.status(400).send(errorDebug(error));
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
  async store(
    @Body() createUserDto: CreateUserDto,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    try {
      const store: ResponseJSON = await this.services.storeUser({
        ...createUserDto,
      });
      res.status(store.statusCode).send(store);
    } catch (error) {
      res.status(400).send(errorDebug(error));
    }
  }

  @Delete('/:user_id')
  @ApiOperation({ summary: 'Delete user using soft delete' })
  async delete(
    @Param('user_id') user_id: string,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    try {
      const deleted_user: ResponseJSON = await this.services.delete(user_id);
      res.status(deleted_user.statusCode).send(deleted_user);
    } catch (error) {
      res.status(400).send(errorDebug(error));
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
    @Req() request: Request,
    @Res() res: Response,
  ) {
    try {
      const { username, email, password, is_banned, is_active, banned_for } =
        updateUserDto;
      if (!user_id)
        res.status(400).send({ ...response400('missing parameter user_id') });
      if (!Boolean(Object.entries(updateUserDto).length))
        res
          .status(HttpStatus.BAD_REQUEST)
          .send({ ...response400('empty request') });
      const user: ResponseJSON = await this.services.update({
        user_id,
        username,
        email,
        password,
        is_banned,
        is_active,
        banned_for,
      });
      res.status(user.statusCode).send(user);
    } catch (error) {
      res.status(400).send(errorDebug(error));
    }
  }
}
