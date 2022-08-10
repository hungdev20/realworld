import { FETCH_ARTICLES_REQUEST, ADD_ARTICLE_REQUEST } from "./constants";

interface Payload {
  tab: string;
  tag: string;
}
export interface AddArticlePayload {
  title: string;
  body: string;
  description: string;
  tagList: object;
}
export const requestFetchArticles = (payload: Payload) => {
  return {
    type: FETCH_ARTICLES_REQUEST,
    payload
  };
};
export const requestAddArticle = (payload: AddArticlePayload) => {
  return {
    type: ADD_ARTICLE_REQUEST,
    payload
  };
};



