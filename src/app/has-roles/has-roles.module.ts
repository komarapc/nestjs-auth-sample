import { HasRolesController } from './has-roles.controller';
import { HasRolesRepository } from './has-roles.repository';
import { HasRolesService } from './has-roles.service';
import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [HasRolesController],
  providers: [HasRolesService, PrismaClient, HasRolesRepository],
})
export class HasRolesModule {}
