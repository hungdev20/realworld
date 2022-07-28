import axiosConfig from "./axiosConfig";

export default async function addUser(data: any) {
  return await axiosConfig({
    method: "post",
    url: "/users",
    data: data,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response.data;
    });
}
