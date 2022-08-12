import { ADD_TAG_REQUEST, ADD_ARTICLE_REQUEST, EDIT_ARTICLE_REQUEST, REMOVE_TAG_REQUEST } from "./constants";


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

export interface AddArticlePayload {
    title: string;
    body: string;
    description: string;
    tagList: object;
}

export const requestAddArticle = (payload: AddArticlePayload, navigate: any) => {
    return {
        type: ADD_ARTICLE_REQUEST,
        payload,
        navigate
    };
};
export const editArticleRequest = (payload: any, navigate: any) => {
    return {
        type: EDIT_ARTICLE_REQUEST,
        payload,
        navigate
    };
};





