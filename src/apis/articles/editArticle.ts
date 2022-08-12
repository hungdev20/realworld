import axiosConfig from "../axiosConfig";

export default async function publishArticle(data: any) {
  const AUTH_TOKEN = localStorage.getItem("token");

  return await axiosConfig({
    method: "put", 
    url: `/articles/${data.article.slug}`,
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
