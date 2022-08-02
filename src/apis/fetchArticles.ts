import axiosConfig from "./axiosConfig";

export default async function fetchArticles(data: any) {
  const AUTH_TOKEN = localStorage.getItem("token");
  let arg = "";
  data.tab === "yourFeed" ? (arg = "articles/feed") : (arg = "articles");
  let paramTypeTag = "";
  data.tag != "" ? (paramTypeTag = `&tag=${data.tag}`) : (paramTypeTag = "");

  return await axiosConfig({
    method: "get",
    url: `/${arg}?limit=10&offset=0${paramTypeTag}`,
    headers: {
      Authorization: "Token " + (AUTH_TOKEN ? AUTH_TOKEN.toString() : ""),
    },
    data: data,
  })
    .then(function (response) {
      return {
        status: response.status,
        data: response.data.articles
      };
    })
    .catch(function (error) {
      return error.response.data;
    });
}
