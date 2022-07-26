import {
    FETCH_COMMENTS_SUCCESS,
    FETCH_COMMENTS_ERRORS,
    FETCH_COMMENTS_REQUEST
} from "./constants";
import {ResponseComments} from "./sagas";

export interface ListCommentState {
    requesting: boolean;
    success: boolean;
    errors: object;
    data: ResponseComments;
}

const initialState: ListCommentState = {
    requesting: false,
    success: false,
    errors: {},
    data: {}
};

export interface Actions {
    type: string;
    data?: ResponseComments,
    error?: object;

}
const fetchCommentsReducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case FETCH_COMMENTS_REQUEST:
            return {
                requesting: true,
                success: false,
                errors: {},
                data: []
            };
        case FETCH_COMMENTS_SUCCESS:
            return {
                requesting: false,
                success: true,
                errors: {},
                data: (action.data)
            };
        case FETCH_COMMENTS_ERRORS:
            return {
                requesting: false,
                success: false,
                errors: action.error,
                data: []
            };
        default:
            return state;
    }
};

export default fetchCommentsReducer;
