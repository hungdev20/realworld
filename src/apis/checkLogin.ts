import axios from "axios";

export default async function checkLogin(data: any) {
  return await axios({
    method: "post",
    url: "https://api.realworld.io/api/users/login",
    data: data,
  })
    .then(function (response) {
      return {
        status: response.status,
        username: response.data.user.username,
        token: response.data.user.token,
      };
    })
    .catch(function (error) {
      return error.response.data;
    });
}
