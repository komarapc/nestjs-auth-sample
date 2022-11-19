import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthLogModule } from './auth-log/auth-log.module';
import { AuthModule } from './auth/auth.module';
import { HasRolesModule } from './has-roles/has-roles.module';
import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    AuthModule,
    AuthLogModule,
    HasRolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
