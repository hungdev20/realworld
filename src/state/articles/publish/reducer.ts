import {
    ADD_ARTICLE_REQUEST,
    ADD_ARTICLE_SUCCESS,
    ADD_ARTICLE_ERRORS,
    EDIT_ARTICLE_REQUEST,
    EDIT_ARTICLE_ERRORS,
    EDIT_ARTICLE_SUCCESS,
} from "./constants";

const initialState: object = {
    tagList: [],
    tag: '',
    errors: {},
    requesting: false,
};

export interface Actions {
    type: string;
    tag: string;
    tagList: object;
    error?: any;

}
const publishArticleReducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case ADD_ARTICLE_REQUEST:
            return {
                tagList: [],
                tag: '',
                errors: {},
                requesting: true
            };
        case ADD_ARTICLE_SUCCESS:
            return {
                ...state,
                requesting: false
            };
        case ADD_ARTICLE_ERRORS:
            return {
                ...state,
                requesting: false,
                errors: action.error
            };
        case EDIT_ARTICLE_REQUEST:
            return {
                ...state,
                requesting: true
            };
        case EDIT_ARTICLE_SUCCESS:
            return {
                ...state,
                requesting: false
            };
        case EDIT_ARTICLE_ERRORS:
            return {
                ...state,
                requesting: false,
                errors: action.error
            };
       
        default:
            return state;
    }
};

export default publishArticleReducer;
