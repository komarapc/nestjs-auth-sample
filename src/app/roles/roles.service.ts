import {
  default_msg_200,
  default_msg_201,
  default_msg_404,
  errorDebug,
  response200,
  response201,
  response404,
  response405,
} from '../../lib/response';

import { Injectable } from '@nestjs/common';
import { RoleRepository } from './roles.repository';
import { T_Roles } from './roles.dto';

@Injectable()
export class RolesService {
  constructor(private readonly repository: RoleRepository) {}
  async getAllRoles() {
    try {
      const roles = await this.repository.getAllRole();
      return { ...response200(default_msg_200), data: { roles } };
    } catch (error) {
      return errorDebug(error);
    }
  }

  async getRolesByCode(role_code: string) {
    try {
      const roles = await this.getRolesByCode(role_code);
      if (!roles) return { ...response404(default_msg_404) };
      return { ...response200(default_msg_200), data: { roles } };
    } catch (error) {
      return errorDebug(error);
    }
  }

  async store({ ...params }: T_Roles) {
    try {
      if (Boolean(await this.repository.getByRoleCode(params.role_code)))
        return { ...response405('already exist') };
      const roles = await this.repository.store(params);
      return { ...response201(default_msg_201), data: { roles } };
    } catch (error) {
      return errorDebug(error);
    }
  }
}
