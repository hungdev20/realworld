import {
    ADD_TAG_REQUEST,
    ADD_TAG_SUCCESS,
    REMOVE_TAG_REQUEST,
    REMOVE_TAG_SUCCESS,
    SET_TAG_DEFAULT
} from "./constants";

export interface TagArticleState {
    tagList: string[];
    tag: string;
    errors: object;
    requesting: boolean;
}

const initialState: TagArticleState = {
    tagList: [],
    tag: '',
    errors: {},
    requesting: false,
};

export interface Actions {
    type: string;
    tag: string;
    tagList: string[];
    error?: any;

}
const addTagArticleReducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case ADD_TAG_REQUEST:
            return {
                ...state,
                tagList: [],
                tag: action.tag,
                requesting: true
            };
        case ADD_TAG_SUCCESS:
            return {
                ...state,
                tagList: action.tagList,
                tag: "",
                requesting: false
            };
        case REMOVE_TAG_REQUEST:
            return {
                ...state,
                tagList: [],
                tag: '',
                requesting: true
            };
        case REMOVE_TAG_SUCCESS:
            return {
                ...state,
                tagList: action.tagList,
                tag: "",
                requesting: false
            };
        case SET_TAG_DEFAULT:
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

export default addTagArticleReducer;
