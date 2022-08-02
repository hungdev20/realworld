import { SIGNUP_REQUESTING, SIGNUP_SUCCESS, SIGNUP_ERROR } from "./constants";

const initialState = {
  requesting: false,
  success: false,
  errors: {},
  messages: [],
};
 
export interface Actions {
  type: string;
  email?: string;
  error?: any;
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
