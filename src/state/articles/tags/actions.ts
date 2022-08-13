import { ADD_TAG_REQUEST, REMOVE_TAG_REQUEST } from "./constants";


export interface PayloadAddTag {
    tag: string;
    tagList: any;
    navigate: any;
}
export interface PayloadRemoveTag {
    tagList: any;
    navigate: any; 
    index: number;
}

export const addTagRequest = (payload: PayloadAddTag) => {
    return {
        type: ADD_TAG_REQUEST,
        payload
    }
}
export const removeTagRequest = (payload: PayloadRemoveTag) => {
    return {
        type: REMOVE_TAG_REQUEST,
        payload
    }
}