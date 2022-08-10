import {
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_ERRORS
} from "./constants";

const initialState: object = {
    requesting: false,
    success: false,
    errors: {},
};

export interface Actions {
    type: string;
    error?: any;

}
const addCommentReducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case ADD_COMMENT_REQUEST:
            return {
                requesting: true,
                success: false,
                errors: {},
            }; 
        case ADD_COMMENT_SUCCESS:
            return {
                requesting: false,
                success: true,
                errors: {},
            };
        case ADD_COMMENT_ERRORS:
            return {
                requesting: false,
                success: false,
                errors: action.error,
            };
        default:
            return state;
    }
};

export default addCommentReducer;
