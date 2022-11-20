import { IsString } from 'class-validator';

export type T_Roles = {
  role_code?: string;
  role_name?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  craeted_by?: string;
  updated_by?: string;
  deleted_by?: string;
};

export class Roles {
  public role_code?: string;
  public role_name?: string;
  public created_at?: string;
  public updated_at?: string;
  public deleted_at?: string;
  public craeted_by?: string;
  public updated_by?: string;
  public deleted_by?: string;
  constructor({ ...params }: T_Roles) {
    this.role_code = params.role_code;
    this.role_name = params.role_name;
    this.created_at = params.created_at;
    this.updated_at = params.updated_at;
    this.deleted_at = params.deleted_at;
    this.craeted_by = params.craeted_by;
    this.updated_by = params.updated_by;
    this.deleted_by = params.deleted_by;
  }
}

export class CreateRolesDto {
  @IsString()
  role_code: string;
  @IsString()
  role_name: string;
}
