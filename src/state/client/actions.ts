// src/clients/actions

import { CLIENT_SET, CLIENT_UNSET } from "./constants";

export function setClient(token: any) {
  return {
    type: CLIENT_SET,
    token,
  };
}

export function unsetClient() {
  return {
    type: CLIENT_UNSET,
  };
}
