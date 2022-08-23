import {
    DELETE_ARTICLE_REQUEST,
    DELETE_ARTICLE_SUCCESS,
    DELETE_ARTICLE_ERRORS
} from "./constants";

export interface DeleteArticleState {
    requesting: boolean;
    success: boolean;
    errors: object;
}

const initialState: DeleteArticleState = {
    requesting: false,
    success: false,
    errors: {}
};

export interface Actions {
    type: string;
    error?: any;
}
const deleteArticleReducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case DELETE_ARTICLE_REQUEST:
            return {
                requesting: true,
                success: false,
                errors: {},

            };
        case DELETE_ARTICLE_SUCCESS:
            return {
                requesting: false,
                success: true,
                errors: {},

            };
        case DELETE_ARTICLE_ERRORS:
            return {
                requesting: false,
                success: false,
                errors: action.error,

            };
        default:
            return state;
    }
};

export default deleteArticleReducer;
