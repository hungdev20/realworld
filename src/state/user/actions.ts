import { NavigateFunction } from "react-router-dom";
import { ACTION_USER_REQUESTING } from "./constants";


export interface ActionUserPayload { 
    username?: string;
    email?: string;
    password?: string;
    method?: string;
    navigate?: NavigateFunction;
}

export const actionUserRequest = (payload: ActionUserPayload) => {
    return {
        type: ACTION_USER_REQUESTING,
        payload
    };
};




