import { Injectable } from '@nestjs/common';
import { TokenService } from './services/token.service';

@Injectable()
export class AppService {
  getHello(): any {
    return { statusCode: 200, success: true, msg: 'ok' };
  }
}
