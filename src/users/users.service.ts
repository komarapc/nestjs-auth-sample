import {
  default_msg_200,
  default_msg_404,
  errorDebug,
  response200,
  response404,
} from './../../app/lib/response';

import { Injectable } from '@nestjs/common';
import UserRepository from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UserRepository) {}
  async getAllUsers() {
    try {
      const users = await this.repository.getAllUsers();
      return { ...response200(default_msg_200), data: { users } };
    } catch (error) {
      return errorDebug(error);
    }
  }
  async getById(user_id: string) {
    try {
      const users = await this.repository.getById(user_id);
      if (!users) return { ...response404(default_msg_404) };
      return { ...response200(default_msg_200), data: { user: users } };
    } catch (error) {
      return errorDebug(error);
    }
  }
  async findByEmail(email: string) {
    try {
      const user = await this.repository.getByEmail(email);
      if (!user) return { ...response404(default_msg_404) };
      return { ...response200(default_msg_200), data: { user } };
    } catch (error) {
      return errorDebug(error);
    }
  }
  async findByUsername(username: string) {
    try {
      const users = await this.repository.getByUsername(username);
      return { ...response200(default_msg_200), data: { users } };
    } catch (error) {
      return errorDebug(error);
    }
  }
}
