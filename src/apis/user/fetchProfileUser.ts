import axiosConfig from "../axiosConfig";

export default async function fetchProfileUser(author: string) {
    const AUTH_TOKEN = localStorage.getItem("token");

    return await axiosConfig({
        method: "get",
        url: `/profiles/${author}`,
        headers: {
            Authorization: "Token " + (AUTH_TOKEN ? AUTH_TOKEN.toString() : ""),
        }
    })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error.response.data;
        });
}
