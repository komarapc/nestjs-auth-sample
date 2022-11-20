import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';

import { ServerResponse } from 'http';
import { TokenService } from 'src/services/token.service';
import { default_msg_401 } from './../lib/response';
import { response401 } from 'src/lib/response';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) {}
  use(req: Request, res: ServerResponse, next: NextFunction) {
    const { authorization }: any = req.headers;

    this.tokenService.setAuthorization(authorization);

    // check authorization
    if (!this.tokenService.checkAuthorization()) {
      res.writeHead(401, { 'content-type': 'application/json' });
      res.write(JSON.stringify({ ...response401(default_msg_401) }));
      res.end();
    }

    /**
     * * check if authorization using Bearer
     */
    if (!this.tokenService.isAuthorizationBearer()) {
      res.writeHead(401, { 'content-type': 'application/json' });
      res.write(JSON.stringify({ ...response401('Bearer token required') }));
      res.end();
    }

    // run tokenizer
    this.tokenService.tokenizer();

    /**
     * * validate token
     * if token expired return will false
     */
    if (!this.tokenService.validateToken()) {
      res.writeHead(401, { 'content-type': 'application/json' });
      res.write(JSON.stringify({ ...response401('Invalid token') }));
      res.end();
    }
    next();
  }
}
