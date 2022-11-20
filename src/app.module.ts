import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthLogModule } from './app/auth-log/auth-log.module';
import { AuthModule } from './app/auth/auth.module';
import { HasRolesModule } from './app/has-roles/has-roles.module';
import { Module } from '@nestjs/common';
import { RolesModule } from './app/roles/roles.module';
import { UsersModule } from './app/users/users.module';

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
