import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './nest/auth/auth.controller';
import { AuthLogModule } from './auth-log/auth-log.module';
import { HasRolesModule } from './has-roles/has-roles.module';

@Module({
  imports: [UsersModule, RolesModule, AuthModule, AuthLogModule, HasRolesModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
