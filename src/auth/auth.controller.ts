import ResponseJSON, {
  errorDebug,
  response400,
} from './../../app/lib/response';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Header, Param, Post, Res } from '@nestjs/common/decorators';

import { AuthDto, AuthRolesDto, SignOutDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Controller, Req } from '@nestjs/common';
import { Request, Response } from 'express';

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
  async signin(
    @Body() createAuthDto: AuthDto,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    try {
      if (!Boolean(Object.keys(createAuthDto).length))
        res.status(400).send({ ...response400('Empty request') });
      const { email, password } = createAuthDto;
      const signin = await this.services.signIn(email, password, {
        header: request.headers,
        network: request.ip,
      });
      console.log({ signin });
      res.status(signin.statusCode).send(signin);
    } catch (error) {
      res.status(400).send(errorDebug(error));
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
    @Res() res: Response,
  ) {
    try {
      // console.log();
      if (!Boolean(Object.keys(authRoleDto).length))
        res.status(400).send({ ...response400('Empty request') });
      const { role_code, email, password } = authRoleDto;
      const signin: ResponseJSON = await this.services.signinByRole(
        role_code,
        email,
        password,
        { header: request.headers, network: request.ip },
      );
      res.status(signin.statusCode).send(signin);
    } catch (error) {
      res.status(400).send(errorDebug(error));
    }
  }

  @Post('/signout')
  @ApiOperation({ summary: 'Sign out' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: {
          title: 'token',
          type: 'string',
          description: 'token from auth',
        },
      },
    },
  })
  async signOut(
    @Body() signOutDto: SignOutDto,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    try {
      const signout: ResponseJSON = await this.services.signOut(
        signOutDto.token,
      );
      res.status(signout.statusCode).send(signout);
    } catch (error) {
      res.status(500).send(errorDebug(error));
    }
  }
}
