import axiosConfig from "../axiosConfig";

export default async function fetchArticles(data: any) {
  const AUTH_TOKEN = localStorage.getItem("token");
  let arg = "";
  if (data.tab === "yourFeed") {
    arg = "articles/feed?"
  } else if (data.tab === "globalFeed") {
    arg = "articles?"
  } else if (data.tab === "myArticles") {
    arg = `articles?author=${data.author}&`
  } else if (data.tab === "favoritedArticles") {
    arg = `articles?favorited=${data.author}&`
  }

  let paramTypeTag = "";

  data.tag != "" ? ((paramTypeTag = `&tag=${data.tag}`) && (arg = "articles?")) : (paramTypeTag = "");
  
  return await axiosConfig({
    method: "get",
    url: `/${arg}limit=10&offset=0${paramTypeTag}`,
    headers: {
      Authorization: "Token " + (AUTH_TOKEN ? AUTH_TOKEN.toString() : ""),
    },
    data: data,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response.data;
    });
}
