import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthLogModule } from './app/auth-log/auth-log.module';
import { AuthModule } from './app/auth/auth.module';
import { HasRolesModule } from './app/has-roles/has-roles.module';
import { RolesModule } from './app/roles/roles.module';
import { TokenMiddleware } from './middleware/token.middleware';
import { TokenService } from './services/token.service';
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
  providers: [AppService, TokenService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .exclude(
        { path: 'auth/signin', method: RequestMethod.ALL },
        { path: 'auth/signinByRole', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}
