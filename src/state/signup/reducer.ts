import { SIGNUP_REQUESTING, SIGNUP_SUCCESS, SIGNUP_ERROR } from "./constants";

export interface Errors {
  email?: string[];
  password?: string[];
  username?: string[];
}

export interface SignUpState {
  requesting: boolean;
  success: boolean;
  errors: Errors;
}

const initialState: SignUpState = {
  requesting: false,
  success: false,
  errors: {},
};

export interface Actions {
  type: string;
  email?: string;
  error?: Errors;
}
function signupReducer(state = initialState, action: Actions) {
  switch (action.type) {
    case SIGNUP_REQUESTING:
      return {
        requesting: true,
        success: false,
        errors: {},
      };
    case SIGNUP_SUCCESS:
      return {
        requesting: false,
        success: true,
        errors: []
      };
    case SIGNUP_ERROR:
      return {
        requesting: false,
        success: false,
        errors: action.error,
      };
    default:
      return state;
  }
}

export default signupReducer;
