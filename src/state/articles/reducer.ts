import {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERRORS,
} from "./constants";

export interface ListArticleState {
  requesting: boolean;
  success: boolean;
  errors: object;
  messages: string;
  data: object;
}

const initialState: ListArticleState = {
  requesting: false,
  success: false,
  errors: {},
  messages: "",
  data: [],
};

export interface Actions {
  type: string;
  data?: object;
  error?: any;
}

const articlesReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case FETCH_ARTICLES_REQUEST:
      return {
        requesting: true,
        success: false,
        errors: {},
        data: [],
        messages: "Loading articles...",
      };
    case FETCH_ARTICLES_SUCCESS:
      return {
        requesting: false,
        success: true,
        errors: {},
        data: (action.data ? action.data : undefined),
        messages: "Fetches articles successfully",
      };
    case FETCH_ARTICLES_ERRORS:
      return {
        requesting: false,
        success: false,
        errors: action.error,
        data: [],
        messages: "",
      };
    case FETCH_ARTICLES_ERRORS:
      return {
        requesting: false,
        success: false,
        errors: action.error,
        data: [],
        messages: "",
      };
    
    default:
      return state;
  }
};

export default articlesReducer;
