import {
    FETCH_COMMENTS_REQUEST,
    ADD_COMMENT_REQUEST,
    DELETE_COMMENT_REQUEST
} from "./constants";

export interface PayloadAddComment {
    param: string,
    body: string
}
export interface PayloadDeleteComment {
    param: string,
    id: number
}
export const fetchCommentsRequest = (payload: string) => {
    return {
        type: FETCH_COMMENTS_REQUEST,
        payload
    }
}
export const addCommentRequest = (payload: PayloadAddComment) => {
    return {
        type: ADD_COMMENT_REQUEST,
        payload
    }
}
export const deleteCommentRequest = (payload: PayloadDeleteComment) => {
    return {
        type: DELETE_COMMENT_REQUEST,
        payload
    }
}
