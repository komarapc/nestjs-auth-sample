import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import ResponseJSON, {
  default_msg_200,
  default_msg_404,
  default_msg_500,
  errorDebug,
  response200,
  response201,
  response404,
  response500,
} from './../../app/lib/response';

import { AuthLogRepository } from 'src/auth-log/auth-log.repository';
import { HasRolesRepository } from 'src/has-roles/has-roles.repository';
import { Injectable } from '@nestjs/common';
import { SECRET_KEY } from 'app/config/config';
import { T_AuthLogHeader } from 'src/auth-log/auth-log.dto';
import { T_HasRoles } from 'src/has-roles/has-roles.dto';
import UserRepository from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly hasRoleRepo: HasRolesRepository,
    private readonly authLogRepo: AuthLogRepository,
  ) {}
  async signIn(email: string, password: string, request: T_AuthLogHeader) {
    try {
      const find_user = await this.userRepo.getByEmail(email);
      if (!find_user) return { ...response404('User not found') };

      // check if user already logged in
      if (await this.checkUserAlreadySignin(find_user.user_id))
        return {
          ...response200('Already sign in. Please comeback another time.'),
        };
      // check if user is banned
      if (find_user.is_banned) {
        // check expires
        const now = Date.now();
        const banned_for = Number(find_user.banned_for);
        if (now > banned_for) {
          // reset banned
          const reset_banned = await this.userRepo.update({
            user_id: find_user.user_id,
            attempt_failed: 0,
            is_banned: false,
            banned_for: null,
          });

          // re-run auth
          await this.signIn(email, password, request);
        }

        return {
          ...response200('Your account currently banned for 1 hour.'),
          data: {
            banned_for: {
              epoch_time: find_user.banned_for,
              iso_format: new Date(Number(find_user.banned_for)).toISOString(),
              local_format: new Date(
                Number(find_user.banned_for),
              ).toLocaleString('id-ID'),
            },
          },
        };
      }
      // check password
      if (!bcrypt.compareSync(password, find_user.password)) {
        const attempt_failed = find_user.attempt_failed + 1;
        let is_banned: boolean = attempt_failed >= 5 ? true : false;
        let banned_for: any = undefined;
        if (attempt_failed >= 5) {
          is_banned = true;
          banned_for = String(new Date().valueOf() + 3600 * 1000); // 1 hour
        }
        // update attempt failed on user
        const attemp_user = await this.userRepo.update({
          user_id: find_user.user_id,
          attempt_failed,
          is_banned,
          banned_for,
        });

        // create attempt failed auth log
        const attemp_unsuccessfull = await this.authLogRepo.storeAuthLog({
          user_id: find_user.user_id,
          attempt_success: false,
          is_valid: false,
          header: request.header,
          network: request.network,
        });
        if (attempt_failed >= 5) {
          return {
            ...response200('Your account currently banned for 1 hour.'),
            data: {
              banned_for: {
                epoch_time: find_user.banned_for,
                iso_format: new Date(
                  Number(find_user.banned_for),
                ).toISOString(),
                local_format: new Date(
                  Number(find_user.banned_for),
                ).toLocaleString('id-ID'),
              },
            },
          };
        }
        return {
          ...response200(
            'Incorret password. Please be carefull your account will be banned for temporary after 5 times login failed',
          ),
        };
      }
      const find_has_roles = await this.hasRoleRepo.getRolesByUserId(
        find_user.user_id,
      );
      let avaliable_roles = new Array();
      find_has_roles.forEach((roles) => {
        avaliable_roles.push(roles.Roles);
      });
      return {
        ...response200(default_msg_200),
        data: {
          user: {
            user_id: find_user.user_id,
            username: find_user.username,
            email: find_user.email,
            is_active: find_user.is_active,
            created_at: find_user.created_at,
          },
          roles: avaliable_roles,
        },
      };
    } catch (error) {
      return errorDebug(error);
    }
  }

  async signinByRole(
    role_code: string,
    email: string,
    password: string,
    request: T_AuthLogHeader,
  ) {
    try {
      // check if email exist
      const find_user = await this.userRepo.getByEmail(email);
      if (!find_user) return { ...response404(default_msg_404) };

      // check user if already sign in
      if (await this.checkUserAlreadySignin(find_user.user_id))
        return {
          ...response200('Already sign in. Please comeback another time.'),
        };

      if (!(await this.checkComparePassword(password, find_user.password)))
        return { ...response200('Incorrect password') };
      // check if user_id and role_code is exist
      const find_role = await this.hasRoleRepo.getByUserIDandRoleCode(
        find_user.user_id,
        role_code,
      );
      if (!find_role) return { ...response404(default_msg_404) };

      // create token
      const token = await this.createToken(
        find_user.user_id,
        find_role.role_code,
      );
      // create auth log
      const auth_log = await this.authLogRepo.storeAuthLog({
        user_id: find_user.user_id,
        role_code: find_role.role_code,
        is_valid: true,
        attempt_success: true,
        token,
        header: request.header,
        network: request.network,
      });
      return {
        ...response201('you are logged in'),
        data: { user: find_user, token, auth_log },
      };
    } catch (error) {
      return errorDebug(error);
    }
  }

  async checkIsEmailExist(email: string): Promise<boolean> {
    try {
      const find = await this.userRepo.getByEmail(email);
      if (!find) return false;
      return true;
    } catch (error) {
      return false;
    }
  }

  async checkComparePassword(
    password: string,
    encryptPassword: string,
  ): Promise<boolean> {
    try {
      return bcrypt.compareSync(password, encryptPassword);
    } catch (error) {
      return false;
    }
  }
  async createToken(user_id: string, role_code: string) {
    const token = jwt.sign(
      {
        user_id,
        role_code,
      },
      SECRET_KEY,
      { expiresIn: '3h' },
    );
    return token;
  }

  async checkUserAlreadySignin(user_id: string): Promise<boolean> {
    const user_logged_in = await this.authLogRepo.findUserLoggedIn(user_id);
    if (!user_logged_in.is_valid) return false;
    return true;
  }
}
