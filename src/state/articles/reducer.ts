import {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERRORS,
} from "./constants";
import { Articles } from "../type";

export interface ListArticleState {
  requesting: boolean;
  success: boolean;
  errors: object;
  data: Articles;
}

const initialState: ListArticleState = { 
  requesting: false,
  success: false,
  errors: {},
  data: {
    articlesCount: 0
  },
};

export interface Actions {
  type: string;
  data?: Articles;
  error?: object;
}

const articlesReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case FETCH_ARTICLES_REQUEST:
      return {
        requesting: true,
        success: false,
        errors: {},
        data: {}
      };
    case FETCH_ARTICLES_SUCCESS:
      return {
        requesting: false,
        success: true,
        errors: {},
        data: (action.data ? action.data : undefined)
      };
    case FETCH_ARTICLES_ERRORS:
      return {
        requesting: false,
        success: false,
        errors: action.error,
        data: {}
      };

    default:
      return state;
  }
};

export default articlesReducer;
