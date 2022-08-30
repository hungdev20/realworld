import axiosConfig from "../axiosConfig";

export default async function actionUser(method = "get", data = {}, auth = true) {
    const AUTH_TOKEN = localStorage.getItem("token");
    let param;
    method === "post" ? param = "users" : param = "user";
    return await axiosConfig({
        method: method,
        url: `/${param}`,
        headers: auth ? {
            Authorization: "Token " + (AUTH_TOKEN ? AUTH_TOKEN.toString() : ""),
        } : undefined,
        data: data,
    })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error.response.data;
        });
}
