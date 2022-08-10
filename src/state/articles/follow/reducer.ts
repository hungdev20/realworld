import {
    FOLLOW_AUTHOR_REQUEST,
    FOLLOW_AUTHOR_SUCCESS,
    FOLLOW_AUTHOR_ERRORS
} from "./constants";

const initialState: object = {
    requesting: false,
    success: false,
    errors: {}
};

export interface Actions {
    type: string;
    error?: any;

}
const followAuthorReducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case FOLLOW_AUTHOR_REQUEST:
            return {
                requesting: true,
                success: false,
                errors: {}
            };
        case FOLLOW_AUTHOR_SUCCESS:
            return {
                requesting: false,
                success: true,
                errors: {}
            };
        case FOLLOW_AUTHOR_ERRORS:
            return {
                requesting: false,
                success: false,
                errors: action.error,
            };
        default:
            return state;
    }
};

export default followAuthorReducer;
