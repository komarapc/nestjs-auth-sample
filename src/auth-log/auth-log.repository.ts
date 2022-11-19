import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { T_AuthLog } from './auth-log.dto';

@Injectable()
export class AuthLogRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async storeAuthLog({ ...params }: T_AuthLog) {
    const auth_log = await this.prisma.authLog.create({
      data: {
        user_id: params.user_id,
        role_code: params.role_code,
        token: params.token,
        attempt_success: params.attempt_success,
        is_valid: params.is_valid,
        created_at: String(new Date().valueOf()),
        header: JSON.stringify(params.header),
        network: params.network,
      },
    });
    return auth_log;
  }

  async findUserLoggedIn(user_id: string) {
    const find_auth_log = await this.prisma.authLog.findMany({
      where: { user_id },
      orderBy: { created_at: 'desc' },
      take: 1,
    });
    return find_auth_log[0];
  }
}
