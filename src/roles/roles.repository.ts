import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { T_Roles } from './roles.dto';

@Injectable()
export class RoleRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getAllRole() {
    const roles = await this.prisma.roles.findMany({
      where: { deleted_at: null },
      orderBy: { role_name: 'asc' },
      include: { RolesCreatedBy: true },
    });
    return roles;
  }

  async getByRoleCode(role_code: string) {
    const roles = await this.prisma.roles.findFirst({
      where: { role_code },
      include: { RolesCreatedBy: true },
    });
    return roles;
  }

  async store({ ...params }: T_Roles) {
    const roles = await this.prisma.roles.create({
      data: {
        role_code: params.role_code,
        role_name: params.role_name,
        created_at: String(new Date().valueOf()),
        created_by: 'admin',
      },
    });
  }
}
