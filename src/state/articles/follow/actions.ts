import { FOLLOW_AUTHOR_REQUEST } from "./constants";

interface PayloadFollowAuthor{
    username: string,
    method: string,
    param: string
}
export const followAuthorRequest = (payload: PayloadFollowAuthor) => {
    return {
        type: FOLLOW_AUTHOR_REQUEST,
        payload
    } 
}
