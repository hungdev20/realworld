import {
    ACTION_USER_REQUESTING,
    ACTION_USER_SUCCESS,
    ACTION_USER_ERROR,
    SET_STATE_USER_DEFAULT
} from "./constants";
import { User } from "../type";

export interface UserState {
    requesting: boolean;
    success: boolean;
    errors: object;
    data: User;
}

const initialState: UserState = {
    requesting: false,
    success: false,
    errors: {},
    data: {},
};

export interface Actions {
    type: string;
    data?: User;
    error?: any;
}

const actionUserReducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case ACTION_USER_REQUESTING:
            return {
                requesting: true,
                success: false,
                errors: {},
                data: {},
            };
        case ACTION_USER_SUCCESS:
            return {
                requesting: false,
                success: true,
                errors: {},
                data: (action.data ? action.data : undefined),
            };
        case ACTION_USER_ERROR:
            return {
                requesting: false,
                success: false,
                errors: action.error,
                data: {},
            };
        case SET_STATE_USER_DEFAULT:
            return {
                requesting: false,
                success: false,
                errors: {},
                data: {},
            };
        default:
            return state;
    }
};

export default actionUserReducer;
