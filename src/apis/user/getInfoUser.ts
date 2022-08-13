import axiosConfig from "../axiosConfig";

export default async function getInfoUser(method = "get", data = {}) {
    const AUTH_TOKEN = localStorage.getItem("token");
    return await axiosConfig({
        method: method,
        url: '/user',
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
