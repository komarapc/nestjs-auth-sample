import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getAllUsers() {
    return await this.prisma.user.findMany({
      where: { is_active: true },
      orderBy: { username: 'asc' },
    });
  }
  async getById(user_id: string) {
    return await this.prisma.user.findFirst({ where: { user_id } });
  }

  async getByEmail(email: string) {
    return await this.prisma.user.findFirst({ where: { email } });
  }

  async getByUsername(username: string) {
    return await this.prisma.user.findMany({
      where: {
        username: { contains: username },
        AND: { is_active: true, AND: { deleted_at: null } },
      },
      orderBy: { username: 'asc' },
    });
  }
}
export default UserRepository;
