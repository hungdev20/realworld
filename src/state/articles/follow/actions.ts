import { FOLLOW_AUTHOR_REQUEST } from "./constants";

interface PayloadFollowAuthor {
    username: string | undefined;
    method: string;
    param?: string | undefined;
}
export const followAuthorRequest = (payload: PayloadFollowAuthor) => {
    return {
        type: FOLLOW_AUTHOR_REQUEST,
        payload
    }
}
