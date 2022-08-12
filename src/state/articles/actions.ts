import { FETCH_ARTICLES_REQUEST, DELETE_ARTICLE_REQUEST } from "./constants";

interface Payload {
  tab: string;
  tag: string;
  author?: string
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

export const deleteArticleRequest = (payload: string, navigate: any) => {
  return {
    type: DELETE_ARTICLE_REQUEST,
    payload,
    navigate
  }
}



