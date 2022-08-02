import { CLIENT_SET, CLIENT_UNSET } from "./constants";

const initialState = {
  id: null,
  token: null,
};
export interface Actions {
  type: string;
  token: string;

}
function clientReducer(state = initialState, action: Actions) {
  switch (action.type) {
    case CLIENT_SET:
      return {
        id: action.token,
        token: action.token,
      };
    case CLIENT_UNSET:
      return {
        id: null,
        token: null,
      };
    default:
      return state;
  }
}

export default clientReducer;
