
import { requestFetchArticles } from "../state/articles/actions";
import { favoriteArticleRequest } from "../state/articles/favourites/actions";
import { requestAddArticle, editArticleRequest } from "../state/articles/publish/actions";
import { addTagRequest, removeTagRequest } from "../state/articles/tags/actions";
import { fetchDetailArticleRequest } from "../state/articles/detail/actions";
import { followAuthorRequest } from "../state/articles/follow/actions";
import { deleteArticleRequest } from "../state/articles/actions";
import { fetchCommentsRequest, addCommentRequest, deleteCommentRequest } from "../state/articles/comments/actions";
import { loginRequest } from "../state/login/actions";
import requestSignup from "../state/signup/actions";
import { updateSettingsRequest} from "../state/settings/actions";
import { fetchProfileUserRequest } from "../state/profile/actions";


const useCustomHook = () => {
    return {
        requestFetchArticles,
        favoriteArticleRequest,
        requestAddArticle,
        editArticleRequest,
        addTagRequest,
        removeTagRequest,
        fetchDetailArticleRequest,
        followAuthorRequest,
        deleteArticleRequest,
        fetchCommentsRequest,
        addCommentRequest,
        deleteCommentRequest,
        loginRequest,
        requestSignup,
        updateSettingsRequest,
        fetchProfileUserRequest
    }
}

export default useCustomHook;