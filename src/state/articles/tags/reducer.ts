import {
    ADD_TAG_REQUEST,
    ADD_TAG_SUCCESS,
    REMOVE_TAG_REQUEST,
    REMOVE_TAG_SUCCESS,
    SET_TAG_DEFAULT
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
const addTagArticleReducer = (state = initialState, action: Actions) => {
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
