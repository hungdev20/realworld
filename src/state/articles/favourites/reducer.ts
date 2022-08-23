import {
  FAVORITE_ARTICLE_SUCCESS,
  FAVORITE_ARTICLE_ERRORS,
  REMOVE_FAVORITE_ARTICLE_SUCCESS,
  REMOVE_FAVORITE_ARTICLE_ERRORS,
  FAVORITE_ARTICLE_REQUEST,
} from "./constants";

export interface FavoriteArticleState {
  requesting: boolean;
  success: boolean;
  errors: object;
  favorited: boolean;
}

const initialState: FavoriteArticleState = {
  requesting: false,
  success: false,
  errors: {},
  favorited: false,
};

export interface Actions {
  type: string;
  payload: {
    favorited: boolean;
  }
  error?: any;

}
const favoriteArticlesReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case FAVORITE_ARTICLE_REQUEST:
      return {
        ...state,
        requesting: true,
        favorited: action.payload.favorited,
      };
    case FAVORITE_ARTICLE_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        favorited: true,
      };
    case FAVORITE_ARTICLE_ERRORS:
      return {
        requesting: false,
        success: false,
        errors: action.error,
        favorited: false,
      };
    case REMOVE_FAVORITE_ARTICLE_SUCCESS:
      return {
        requesting: false,
        success: true,
        errors: {},
        favorited: false,
      };
    case REMOVE_FAVORITE_ARTICLE_ERRORS:
      return {
        requesting: false,
        success: false,
        errors: action.error,
        favorited: true,
      };
   
    default:
      return state;
  }
};

export default favoriteArticlesReducer;
