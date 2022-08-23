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
  messages: object;
}

const initialState: SignUpState = {
  requesting: false,
  success: false,
  errors: {},
  messages: [],
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
        messages: [{ body: "Signing up...", time: new Date() }],
      };
    case SIGNUP_SUCCESS:
      return {
        requesting: false,
        success: true,
        errors: [],
        messages: [
          {
            body: `Signed up successfull for ${action.email}`,
            time: new Date(),
          },
        ],
      };
    case SIGNUP_ERROR:
      return {
        requesting: false,
        success: false,
        errors: action.error,
        messages: [],
      };
    default:
      return state;
  }
}

export default signupReducer;
