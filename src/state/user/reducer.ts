import {
    FETCH_PROFILE_USER_REQUEST,
    FETCH_PROFILE_USER_SUCCESS,
    FETCH_PROFILE_USER_ERRORS
} from "./constants";

const initialState: object = {
    requesting: false,
    success: false,
    errors: {},
    data: {}
};

export interface Actions {
    type: string;
    data?: object,
    error?: any;

}
const profileUserReducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case FETCH_PROFILE_USER_REQUEST:
            return {
                requesting: true,
                success: false,
                errors: {},
                data: {}
            };
        case FETCH_PROFILE_USER_SUCCESS:
            return {
                requesting: false,
                success: true,
                errors: {},
                data: (action.data)
            };
        case FETCH_PROFILE_USER_ERRORS:
            return {
                requesting: false,
                success: false,
                errors: action.error,
                data: {}
            };
        default:
            return state;
    }
};

export default profileUserReducer;
