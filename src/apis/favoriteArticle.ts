import axiosConfig from "./axiosConfig";

export default async function favoriteArticle(data: any) {
  const AUTH_TOKEN = localStorage.getItem("token");
  let method = "post";
  data.favorited ? method = "delete" : method = "post"

  return await axiosConfig({
    method: method,
    url: `/articles/${data.slug}/favorite`,
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
