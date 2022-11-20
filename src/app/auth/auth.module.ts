import { AuthController } from './auth.controller';
import { AuthLogRepository } from 'src/app/auth-log/auth-log.repository';
import { AuthService } from './auth.service';
import { HasRolesRepository } from 'src/app/has-roles/has-roles.repository';
import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import UserRepository from 'src/app/users/users.repository';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    PrismaClient,
    HasRolesRepository,
    AuthLogRepository,
  ],
})
export class AuthModule {}
