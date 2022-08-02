import axiosConfig from "./axiosConfig";

export default async function checkLogin(data: any) {
  return await axiosConfig({
    method: "post",
    url: "/users/login",
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
