import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RoleRepository } from './roles.repository';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService, PrismaClient, RoleRepository],
})
export class RolesModule {}
