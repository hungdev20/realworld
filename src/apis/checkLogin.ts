import axios from "axios";

export default async function checkLogin(data: any) {
  return await axios({
    method: "post",
    url: "https://api.realworld.io/api/users/login",
    data: data,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response.data;
    });
}
