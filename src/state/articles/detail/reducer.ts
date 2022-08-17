import {
    FETCH_DETAIL_ARTICLE_SUCCESS,
    FETCH_DETAIL_ARTICLE_ERRORS,
    FETCH_DETAIL_ARTICLE_REQUEST,
    SET_STATE_DEFAULT
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
const detailArticleReducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case FETCH_DETAIL_ARTICLE_REQUEST:
            return {
                requesting: true,
                success: false,
                errors: {},
                data: {}
            };
        case FETCH_DETAIL_ARTICLE_SUCCESS:
            return {
                requesting: false,
                success: true,
                errors: {},
                data: (action.data)
            };
        case FETCH_DETAIL_ARTICLE_ERRORS:
            return {
                requesting: false,
                success: false,
                errors: action.error,
                data: {}
            };
        case SET_STATE_DEFAULT:
            return {
                requesting: false,
                success: false,
                errors: {},
                data: {}
            };
        default:
            return state;
    }
};

export default detailArticleReducer;
