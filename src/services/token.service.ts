import * as jwt from 'jsonwebtoken';

import { Injectable } from '@nestjs/common/decorators';
import { SECRET_KEY } from 'src/config/config';
import { Scope } from '@nestjs/common/interfaces/scope-options.interface';

@Injectable({ scope: Scope.REQUEST })
export class TokenService {
  private token: string;
  private authorization: string;

  setAuthorization(authorization: string) {
    this.authorization = authorization;
  }
  getAuthorization() {
    return this.authorization;
  }

  setToken() {
    this.token = this.bearerToken();
  }

  getToken() {
    return this.token;
  }

  // tokenoizer
  // checking if authorization
  checkAuthorization() {
    if (!this.authorization) return false;
    return true;
  }

  isAuthorizationBearer(): Boolean {
    const bearer = this.authorization.split(' ');
    return bearer[0] === 'Bearer' ? true : false;
  }
  bearerToken() {
    const tokenizer = this.authorization.split(' ');
    return tokenizer[1];
  }

  tokenizer() {
    this.bearerToken();
    this.setToken();
  }

  validateToken() {
    try {
      const token = jwt.verify(this.token, SECRET_KEY);
      return Boolean(Object.keys(token).length);
    } catch (error) {
      return false;
    }
  }

  decodeToken() {
    return jwt.decode(this.getToken());
  }
}
