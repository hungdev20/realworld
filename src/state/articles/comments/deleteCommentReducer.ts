import {
    DELETE_COMMENT_REQUEST,
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
const deleteCommentReducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case DELETE_COMMENT_REQUEST:
            return {
                requesting: true,
                success: false,
                errors: {},
            }; 
        default:
            return state;
    }
};

export default deleteCommentReducer;
