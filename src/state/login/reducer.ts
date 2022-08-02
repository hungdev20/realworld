import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from "./constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
};
export interface Actions {
  type: string;
  error?: any;
}
const loginReducer = function loginReducer(state = initialState, action: Actions) {
  switch (action.type) {
    // Set the requesting flag and append a message to be shown
    case LOGIN_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: "Logging in...", time: new Date() }],
        errors: [],
      };

    // Successful?  Reset the login state.
    case LOGIN_SUCCESS:
      return {
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
      };

    // Append the error returned from our api
    // set the success and requesting flags to false
    case LOGIN_ERROR:
      return {
        errors: action.error,
        messages: [],
        requesting: false,
        successful: false,
      };

    default:
      return state;
  }
};

export default loginReducer;
