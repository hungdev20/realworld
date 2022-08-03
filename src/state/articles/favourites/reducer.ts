import {
   LIKE_ARTICLE_SUCCESS,
   LIKE_ARTICLE_ERRORS,
   REMOVE_LIKE_ARTICLE_SUCCESS,
   REMOVE_LIKE_ARTICLE_ERRORS,
   FAVORITE_ARTICLE_REQUEST
  } from "./constants";
  
  const initialState: object = {
    requesting: false,
    success: false,
    errors: {},
    favorited: false,
  };
  
  export interface Actions {
    type: string;
    favorited: boolean;
    error?: any;
   
  }
  const favoriteArticlesReducer = (state = initialState, action: Actions) => {
    switch (action.type) {
      case FAVORITE_ARTICLE_REQUEST:
        return {
          requesting: true,
          success: false,
          errors: {},
          favorited: action.favorited
        };
      case LIKE_ARTICLE_SUCCESS:
        return {
            requesting: true,
            success: false,
            errors: {},
            favorited: true
        };
      case LIKE_ARTICLE_ERRORS:
        return {
            requesting: true,
            success: false,
            errors: action.error,
            favorited: false
        };
      case REMOVE_LIKE_ARTICLE_SUCCESS:
        return {
            requesting: true,
            success: false,
            errors: {},
            favorited: false
        };
      case REMOVE_LIKE_ARTICLE_ERRORS:
        return {
            requesting: true,
            success: false,
            errors: action.error,
            favorited: true
        };
      default:
        return state;
    }
  };
  
  export default favoriteArticlesReducer;
  