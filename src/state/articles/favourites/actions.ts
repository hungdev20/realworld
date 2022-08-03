import { FAVORITE_ARTICLE_REQUEST } from "./constants";


interface Payload {
    slug: string;
    favorited: boolean
}
export const favoriteArticleRequest = (payload: Payload) => {
    return {
        type: FAVORITE_ARTICLE_REQUEST,
        payload
    }
}
