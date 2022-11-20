import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class HasRolesRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async getRolesByUserId(user_id: string) {
    const has_roles = await this.prisma.hasRole.findMany({
      where: { user_id, AND: { deleted_at: null } },
      select: { Roles: true },
    });
    return has_roles;
  }

  async getByUserIDandRoleCode(user_id: string, role_code: string) {
    const roles = await this.prisma.hasRole.findFirst({
      where: { user_id, AND: { role_code } },
    });
    return roles;
  }
}
