import { AuthLogController } from './auth-log.controller';
import { AuthLogRepository } from './auth-log.repository';
import { AuthLogService } from './auth-log.service';
import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [AuthLogController],
  providers: [AuthLogService, PrismaClient, AuthLogRepository],
})
export class AuthLogModule {}
