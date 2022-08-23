import axiosConfig from "../axiosConfig";

export default async function followAuthorArticle(username: string | undefined, method = "post") {
    const AUTH_TOKEN = localStorage.getItem("token");

    return await axiosConfig({
        method: method,
        url: `/profiles/${username}/follow`,
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
