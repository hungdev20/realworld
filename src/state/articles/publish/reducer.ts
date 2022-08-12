import {
    ADD_TAG_REQUEST,
    ADD_TAG_SUCCESS,
    REMOVE_TAG_REQUEST,
    REMOVE_TAG_SUCCESS,
    ADD_ARTICLE_REQUEST,
    ADD_ARTICLE_SUCCESS,
    ADD_ARTICLE_ERRORS,
    EDIT_ARTICLE_REQUEST,
    EDIT_ARTICLE_ERRORS,
    EDIT_ARTICLE_SUCCESS
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
        case ADD_TAG_REQUEST:
            return {
                tagList: [],
                tag: action.tag,
                errors: {},
                requesting: true
            };
        case ADD_TAG_SUCCESS:
            return {
                tagList: action.tagList,
                tag: "",
                errors: {},
                requesting: false
            };
        case REMOVE_TAG_REQUEST:
            return {
                tagList: [],
                tag: '',
                errors: {},
                requesting: true
            };
        case REMOVE_TAG_SUCCESS:
            return {
                tagList: action.tagList,
                tag: "",
                errors: {},
                requesting: false
            };
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
                errors: action.error
            };
        default:
            return state;
    }
};

export default publishArticleReducer;
