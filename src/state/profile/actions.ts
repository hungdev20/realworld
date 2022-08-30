import { FETCH_PROFILE_USER_REQUEST } from "./constants";


export const fetchProfileUserRequest = (payload: string) => {
    return {
        type: FETCH_PROFILE_USER_REQUEST,
        payload
    } 
}
