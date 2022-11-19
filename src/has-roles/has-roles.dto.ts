export type T_HasRoles = {
  id?: string;
  user_id?: string;
  role_code?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  created_by?: string;
  updated_by?: string;
  deleted_by?: string;
};

export class HasRoles {
  public id?: string;
  public user_id?: string;
  public role_code?: string;
  public created_at?: string;
  public updated_at?: string;
  public deleted_at?: string;
  public created_by?: string;
  public updated_by?: string;
  public deleted_by?: string;
  constructor({ ...params }: T_HasRoles) {
    this.id = params.id;
    this.user_id = params.user_id;
    this.role_code = params.role_code;
    this.created_at = params.created_at;
    this.updated_at = params.updated_at;
    this.deleted_at = params.deleted_at;
    this.created_by = params.created_by;
    this.updated_by = params.updated_by;
    this.deleted_by = params.deleted_by;
  }
}
