import { ADD_ARTICLE_REQUEST, EDIT_ARTICLE_REQUEST} from "./constants";

export interface AddArticlePayload {
    title: string;
    body: string;
    description: string;
    tagList: object;
    navigate: any;
}
export interface PayloadEditArticle {
    article: any;
    navigate: any;
}


export const requestAddArticle = (payload: AddArticlePayload) => {
    return {
        type: ADD_ARTICLE_REQUEST,
        payload
    };
};
export const editArticleRequest = (payload: PayloadEditArticle) => {
    return {
        type: EDIT_ARTICLE_REQUEST,
        payload
    };
};





