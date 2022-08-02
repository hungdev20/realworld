import { LOGIN_REQUESTING, LOGOUT_REQUEST } from "./constants";
export interface User {
  email: string;
  password: string;
}
export const loginRequest = (payload: User, navigate: any) => ({
  type: LOGIN_REQUESTING,
  payload,
  navigate,
});
export const logout = (navigate: any) => ({
  type: LOGOUT_REQUEST,
  navigate,
});
