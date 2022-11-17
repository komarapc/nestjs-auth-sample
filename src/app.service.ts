import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return { statusCode: 200, success: true, msg: 'ok' };
  }
}
