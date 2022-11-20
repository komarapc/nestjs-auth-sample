export type T_AuthLog = {
  id?: string;
  user_id?: string;
  role_code?: string;
  token?: string;
  is_valid?: boolean;
  attempt_success?: boolean;
  created_at?: string;
  header?: string;
  network?: string;
};
export type T_AuthLogHeader = {
  header: any;
  network: string;
};
