import { IsEmail, IsString } from 'class-validator';

export type T_Auth = {
  email: string;
  password: string;
  user_id?: string;
  role_code?: string;
};

export class AuthDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
export class AuthRolesDto {
  @IsString()
  role_code: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
