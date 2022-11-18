import { T_User, UpdateUserDto } from './users.dto';

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

  async getManyByUsername(username: string) {
    return await this.prisma.user.findMany({
      where: {
        username: { contains: username },
        AND: { is_active: true, AND: { deleted_at: null } },
      },
      orderBy: { username: 'asc' },
    });
  }

  async getSingleByUsername(username: string) {
    return await this.prisma.user.findFirst({
      where: { username },
    });
  }

  async createOne({ ...params }: T_User) {
    const user = await this.prisma.user.create({
      data: {
        email: params.email,
        username: params.username,
        password: params.password,
        created_at: params.created_at,
      },
    });
    return user;
  }

  async delete(user_id: string) {
    return await this.prisma.user.update({
      where: { user_id },
      data: {
        is_active: false,
        updated_at: String(new Date().valueOf()),
        deleted_at: String(new Date().valueOf()),
      },
    });
  }

  async update({ ...params }: T_User) {
    const user = await this.prisma.user.update({
      where: { user_id: params.user_id },
      data: {
        ...params,
        updated_at: String(new Date().valueOf()),
      },
    });
    return user;
  }
}
export default UserRepository;
