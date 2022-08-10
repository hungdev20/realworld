import {
    FETCH_SETTINGS_REQUESTING,
    FETCH_SETTINGS_SUCCESS,
    FETCH_SETTINGS_ERRORS,
    UPDATE_SETTINGS_REQUESTING,
    UPDATE_SETTINGS_SUCCESS,
    UPDATE_SETTINGS_ERRORS
} from "./constants";
import { payloadUser } from "./actions";

const initialState = {
    requesting: false,
    successful: false,
    data: {},
    errors: [],
};
export interface Actions {
    type: string;
    error?: any;
    data?: any;
}
const settingsReducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case FETCH_SETTINGS_REQUESTING:
            return {
                requesting: true,
                successful: false,
                data: {},
                errors: [],
            };

        // Successful?  Reset the login state.
        case FETCH_SETTINGS_SUCCESS:
            return {
                errors: [],
                data: action.data,
                requesting: false,
                successful: true,
            };

        // Append the error returned from our api
        // set the success and requesting flags to false
        case FETCH_SETTINGS_ERRORS:
            return {
                errors: action.error,
                data: {},
                requesting: false,
                successful: false,
            };
        case UPDATE_SETTINGS_REQUESTING:
            return {
                requesting: true,
                successful: false,
                data: {},
                errors: [],
            };
        case UPDATE_SETTINGS_SUCCESS:
            return {
                errors: [],
                data: {},
                requesting: false,
                successful: true,
            };
        case UPDATE_SETTINGS_ERRORS:
            return {
                errors: action.error,
                data: {},
                requesting: false,
                successful: false,
            };

        default:
            return state;
    }
};

export default settingsReducer;
