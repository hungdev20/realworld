import axiosConfig from "../axiosConfig";

export default async function deleteCommentArticle(param: string | undefined, id: number) {
    const AUTH_TOKEN = localStorage.getItem("token");

    return await axiosConfig({
        method: "delete",
        url: `/articles/${param}/comments/${id}`,
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
