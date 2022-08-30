import { FAVORITE_ARTICLE_REQUEST } from "./constants";


interface Payload {
    index: number;
    slug: string | undefined;
    favorited: boolean;
    detail?: boolean;
    
}
export const favoriteArticleRequest = (payload: Payload) => {
    return {
        type: FAVORITE_ARTICLE_REQUEST,
        payload
    }
}
