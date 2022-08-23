import {
    ADD_ARTICLE_REQUEST,
    ADD_ARTICLE_SUCCESS,
    ADD_ARTICLE_ERRORS,
    EDIT_ARTICLE_REQUEST,
    EDIT_ARTICLE_ERRORS,
    EDIT_ARTICLE_SUCCESS,
    SET_STATE_PUBLISH_DEFAULT
} from "./constants";

export interface PublishArticleState {
    tagList: object;
    tag: string;
    errors: object;
    requesting: boolean;
}
const initialState: PublishArticleState = {
    tagList: [],
    tag: '',
    errors: {},
    requesting: false,
};

export interface PayloadPublishArticle {
    type: string;
    tag: string;
    tagList: string[];
    error?: any;

}
const publishArticleReducer = (state = initialState, action: PayloadPublishArticle) => {
    switch (action.type) {
        case ADD_ARTICLE_REQUEST:
            return {
                ...state,
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
        case SET_STATE_PUBLISH_DEFAULT:
            return {
                tagList: [],
                tag: '',
                errors: {},
                requesting: false,
            };

        default:
            return state;
    }
};

export default publishArticleReducer;
