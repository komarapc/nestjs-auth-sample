export type T_ResponseJSON = {
  statusCode: number;
  success: boolean;
  msg: string;
  data?: any;
};

export default class ResponseJSON {
  public statusCode?: number;
  public success?: boolean;
  public msg?: string;
  public data?: any;

  constructor({ ...params }: T_ResponseJSON) {
    this.statusCode = params.statusCode;
    this.success = params.success;
    this.msg = params.msg;
    this.data = params.data;
  }
}

export const default_msg_200 = 'ok.';
export const default_msg_201 = 'data created.';
export const default_msg_400 = 'bad request.';
export const default_msg_401 = 'unauthorized';
export const default_msg_403 = 'forbidden access.';
export const default_msg_404 = 'not found.';
export const default_msg_405 = 'method not allowed.';
export const default_msg_409 = 'conflict.';
export const default_msg_500 = 'internal server error.';

export const response200 = (msg: string): ResponseJSON => {
  return new ResponseJSON({ statusCode: 200, success: true, msg });
};
export const response201 = (msg: string): ResponseJSON => {
  return new ResponseJSON({ statusCode: 201, success: true, msg });
};
export const response400 = (msg: string): ResponseJSON => {
  return new ResponseJSON({ statusCode: 400, success: false, msg });
};
export const response401 = (msg: string): ResponseJSON => {
  return new ResponseJSON({ statusCode: 401, success: false, msg });
};
export const response403 = (msg: string): ResponseJSON => {
  return new ResponseJSON({ statusCode: 403, success: false, msg });
};
export const response404 = (msg: string): ResponseJSON => {
  return new ResponseJSON({ statusCode: 404, success: false, msg });
};
export const response405 = (msg: string): ResponseJSON => {
  return new ResponseJSON({ statusCode: 405, success: false, msg });
};
export const response409 = (msg: string): ResponseJSON => {
  return new ResponseJSON({ statusCode: 409, success: false, msg });
};
export const response500 = (msg: string): ResponseJSON => {
  return new ResponseJSON({ statusCode: 404, success: false, msg });
};
