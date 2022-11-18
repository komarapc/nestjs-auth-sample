import { DEBUG } from './../config/config';

export type T_ResponseJSON = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: any;
};

export default class ResponseJSON {
  public statusCode?: number;
  public success?: boolean;
  public message?: string;
  public data?: any;

  constructor({ ...params }: T_ResponseJSON) {
    this.statusCode = params.statusCode;
    this.success = params.success;
    this.message = params.message;
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

export const response200 = (message: string): ResponseJSON => {
  return new ResponseJSON({ statusCode: 200, success: true, message });
};
export const response201 = (message: string): ResponseJSON => {
  return new ResponseJSON({ statusCode: 201, success: true, message });
};
export const response400 = (message: string): ResponseJSON => {
  return new ResponseJSON({ statusCode: 400, success: false, message });
};
export const response401 = (message: string): ResponseJSON => {
  return new ResponseJSON({ statusCode: 401, success: false, message });
};
export const response403 = (message: string): ResponseJSON => {
  return new ResponseJSON({ statusCode: 403, success: false, message });
};
export const response404 = (message: string): ResponseJSON => {
  return new ResponseJSON({ statusCode: 404, success: false, message });
};
export const response405 = (message: string): ResponseJSON => {
  return new ResponseJSON({ statusCode: 405, success: false, message });
};
export const response409 = (message: string): ResponseJSON => {
  return new ResponseJSON({ statusCode: 409, success: false, message });
};
export const response500 = (message: string): ResponseJSON => {
  return new ResponseJSON({ statusCode: 404, success: false, message });
};
export const errorDebug = (error: any) => {
  if (!DEBUG) return { ...response500(default_msg_500) };
  return { ...response500(error.message) };
};
