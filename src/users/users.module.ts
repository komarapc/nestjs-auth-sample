import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import UserRepository from './users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, PrismaClient],
})
export class UsersModule {}
