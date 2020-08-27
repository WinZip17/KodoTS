export const GET_USER_DATA = '[USER] GET_USER_DATA';

export interface UserInfo {
  avatar_type: string | null;
  birthday: string | null;
  code_confirmed: string | null;
  code_sent_at: string | null;
  created_at: string | null;
  email: string | null;
  id: number | null;
  name: string | null;
  phone: string | null;
  role: string | null;
  sex: string | null;
  sms_code: string | null;
  updated_at: string | null;
}

export interface UserState {
  loading: boolean;
  user: UserInfo | null;
}

export interface getUser {
  type: typeof GET_USER_DATA;
  payload: UserInfo;
}

export type UserActionTypes = getUser;
