import { errorDebug, response400 } from './../../app/lib/response';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Param, Post } from '@nestjs/common/decorators';

import { AuthDto, AuthRolesDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Controller, Req } from '@nestjs/common';
import { Request } from 'express';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly services: AuthService) {}
  @Post('/signin')
  @ApiOperation({ summary: 'signin - get avaliable roles' })
  @ApiBody({
    // description: 'create credential',
    schema: {
      type: 'object',
      properties: {
        email: {
          title: 'email',
          type: 'string',
          example: 'admin@gmail.com',
          description: 'email',
        },
        password: {
          title: 'password',
          type: 'string',
          example: 'secretnumber',
          description: 'Plaintext',
        },
      },
    },
  })
  async signin(@Body() createAuthDto: AuthDto, @Req() request: Request) {
    try {
      if (!Boolean(Object.keys(createAuthDto).length))
        return { ...response400('Empty request') };
      const { email, password } = createAuthDto;
      const signin = await this.services.signIn(email, password, {
        header: request.headers,
        network: request.ip,
      });
      return signin;
    } catch (error) {
      return errorDebug(error);
    }
  }

  @Post('/signinByRole')
  @ApiOperation({ summary: 'signin - make credentials' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        role_code: {
          title: 'role_code',
          type: 'string',
          example: 'admin',
          description: 'role code',
        },
        email: {
          title: 'email',
          type: 'string',
          example: 'admin@gmail.com',
          description: 'email you are logged into',
        },
        password: {
          title: 'password',
          type: 'string',
          example: 'secretnumber',
          description: 'plaintext',
        },
      },
    },
  })
  async signinByRole(
    @Body() authRoleDto: AuthRolesDto,
    @Req() request: Request,
  ) {
    try {
      // console.log();
      if (!Boolean(Object.keys(authRoleDto).length))
        return { ...response400('Empty request') };
      const { role_code, email, password } = authRoleDto;
      const signin = await this.services.signinByRole(
        role_code,
        email,
        password,
        { header: request.headers, network: request.ip },
      );
      return signin;
    } catch (error) {
      return errorDebug(error);
    }
  }
}
