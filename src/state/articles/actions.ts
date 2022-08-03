import { FETCH_ARTICLES_REQUEST} from "./constants";

interface Payload {
  tab: string;
  tag: string;
}
export const requestFetchArticles = (payload: Payload) => {
  return {
    type: FETCH_ARTICLES_REQUEST,
    payload,
  };
};

