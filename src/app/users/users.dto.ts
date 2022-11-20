import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserDto {
  user_id?: string;
  username?: string;
  password?: string;
  email?: string;
  is_active?: boolean;
  is_banned?: boolean;
  banned_for?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

/**
 * * this class for validation create user
 */
export class CreateUserDto {
  @IsString()
  username: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  user_id: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsBoolean()
  is_banned: boolean;

  @IsOptional()
  @IsBoolean()
  is_active: boolean;

  @IsOptional()
  @IsString()
  banned_for: string;
}

export type T_User = {
  user_id?: string;
  username?: string;
  password?: string;
  email?: string;
  is_active?: boolean;
  is_banned?: boolean;
  attempt_failed?: number;
  banned_for?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
};
