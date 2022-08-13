
import { SIGNUP_REQUESTING } from "./constants";

export interface User {
  username: string;
  email: string;
  password: string;
}
function requestSignup(payload: User, navigate: any) {
  return {
    type: SIGNUP_REQUESTING,
    payload,
    navigate
  };
}

export default requestSignup;
