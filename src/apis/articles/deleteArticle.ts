import axiosConfig from "../axiosConfig";

export default async function deleteArticle(data: string | undefined) {

    return await axiosConfig({
        method: "delete",
        url: `/articles/${data}`
    })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error.response.data;
        });
}
