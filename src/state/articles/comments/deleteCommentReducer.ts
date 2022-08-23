import {
    DELETE_COMMENT_REQUEST,
} from "./constants";

export interface DeleteCommentState {
    requesting: boolean;
    success: boolean;
    errors: object;
}

const initialState: DeleteCommentState = {
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
