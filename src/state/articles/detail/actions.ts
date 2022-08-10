import { FETCH_DETAIL_ARTICLE_REQUEST } from "./constants";


export const fetchDetailArticleRequest = (payload: string) => {
    return {
        type: FETCH_DETAIL_ARTICLE_REQUEST,
        payload
    } 
}
