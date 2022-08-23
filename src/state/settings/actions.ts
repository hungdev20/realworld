import { FETCH_SETTINGS_REQUESTING, UPDATE_SETTINGS_REQUESTING } from "./constants";
export interface payloadUser {
    email?: string; 
    username?: string;
    bio?: string;
    image?: string;
    password?: string;
}
export const fetchSettingsRequest = () => ({
    type: FETCH_SETTINGS_REQUESTING
});
export const updateSettingsRequest = (payload: payloadUser, navigate: any) => ({
    type: UPDATE_SETTINGS_REQUESTING,
    payload,
    navigate,
});

