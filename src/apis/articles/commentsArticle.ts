import axiosConfig from "../axiosConfig";

export default async function commentsArticle(param: string, data = {}, method = "get") {
    const AUTH_TOKEN = localStorage.getItem("token");

    return await axiosConfig({
        method: method,
        url: `/articles/${param}/comments`,
        headers: {
            Authorization: "Token " + (AUTH_TOKEN ? AUTH_TOKEN.toString() : ""),
        },
        data: data
    })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error.response.data;
        });
}
