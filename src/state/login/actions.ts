import { NavigateFunction } from "react-router-dom";
import { LOGIN_REQUESTING, LOGOUT_REQUEST } from "./constants";
export interface User {
  email: string;
  password: string;
  navigate: NavigateFunction;
}
export const loginRequest = (payload: User) => ({
  type: LOGIN_REQUESTING,
  payload
});
export const logout = (navigate: any) => ({
  type: LOGOUT_REQUEST,
  navigate,
});
