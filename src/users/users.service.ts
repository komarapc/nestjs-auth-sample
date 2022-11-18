import * as bcrypt from 'bcrypt';

import {
  default_msg_200,
  default_msg_201,
  default_msg_404,
  errorDebug,
  response200,
  response201,
  response404,
  response405,
} from './../../app/lib/response';

import { Injectable } from '@nestjs/common';
import { SALT_ROUND } from './../../app/config/config';
import { T_User } from './users.dto';
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
      const users = await this.repository.getManyByUsername(username);
      return { ...response200(default_msg_200), data: { users } };
    } catch (error) {
      return errorDebug(error);
    }
  }

  async checkUserById(user_id: string): Promise<boolean> {
    try {
      return Boolean(await this.repository.getById(user_id));
    } catch (error) {
      return false;
    }
  }

  async storeUser({ ...params }: T_User) {
    try {
      let { username, email, password } = params;
      // check if email already exist
      const find_email = await this.repository.getByEmail(email);
      if (find_email) return { ...response405('Email already exist') };

      // check if username already exist
      const find_username = await this.repository.getSingleByUsername(username);
      if (find_username) return { ...response405('Username already exist') };

      password = await bcrypt.hash(password, SALT_ROUND);
      const created_at = String(new Date().valueOf());
      const store_user = await this.repository.createOne({
        username,
        email,
        password,
        created_at,
      });
      return { ...response201(default_msg_201), data: { user: store_user } };
    } catch (error) {
      return errorDebug(error);
    }
  }

  async delete(user_id: string) {
    try {
      if (!(await this.checkUserById(user_id)))
        return { ...response404(default_msg_404) };
      const deleted_user = await this.repository.delete(user_id);
      return { ...response201('deleted'), data: { user: deleted_user } };
    } catch (error) {
      return errorDebug(error);
    }
  }

  async update({ ...params }: T_User) {
    try {
      if (!(await this.checkUserById(params.user_id)))
        return { ...response404(default_msg_404) };
      let {
        user_id,
        username,
        email,
        password,
        is_banned,
        is_active,
        banned_for,
      } = params;
      if (password) password = await bcrypt.hash(password, SALT_ROUND);
      const update = await this.repository.update({
        user_id,
        username,
        email,
        password,
        is_banned,
        is_active,
        banned_for,
      });
      return { ...response201('updated'), data: { update } };
    } catch (error) {
      return errorDebug(error);
    }
  }
}
