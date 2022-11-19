import { CreateRolesDto } from './roles.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { RolesService } from './roles.service';
import {
  errorDebug,
  response400,
  default_msg_400,
} from './../../app/lib/response';
import { Body, Param, Post } from '@nestjs/common/decorators';
@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly services: RolesService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all roles' })
  async getAllRoles() {
    try {
      const roles = await this.services.getAllRoles();
      return roles;
    } catch (error) {
      return errorDebug(error);
    }
  }

  @Get('/:role_code')
  @ApiOperation({ summary: 'Get single role by role_code' })
  async getRolesByCode(@Param() role_code: string) {
    try {
      if (!role_code) return { ...response400('missing parameter role_code') };
      const roles = await this.services.getRolesByCode(role_code);
      return roles;
    } catch (error) {
      return errorDebug(error);
    }
  }

  @Post('/')
  @ApiOperation({ summary: 'Create new record' })
  @ApiBody({
    description: 'tes',
    schema: {
      type: 'object',
      properties: {
        role_code: {
          title: 'role_code',
          type: 'string',
          example: 'manager',
          description: 'unique',
        },
        role_name: {
          title: 'role_name',
          type: 'string',
          example: 'Manager',
          description: '',
        },
      },
    },
  })
  async store(@Body() createRoleDto: CreateRolesDto) {
    try {
      if (!Boolean(Object.keys(createRoleDto).length))
        return { ...response400('Empty request') };
      const roles = await this.services.store(createRoleDto);
    } catch (error) {
      return errorDebug(error);
    }
  }
}
