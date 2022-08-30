
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
import { updateSettingsRequest } from "../state/settings/actions";
import { fetchProfileUserRequest } from "../state/profile/actions";
import { useSelector } from 'react-redux';

import { IrootReducer } from "../index-reducer";


const useArticle = () => {
    const tagArticleState = useSelector((state: IrootReducer) => state.addTagArticle);
    const publishArticleState = useSelector((state: IrootReducer) => state.publishArticle);
    const detailArticle = useSelector((state: IrootReducer) => state.detailArticle.data.article);
    const errorPublishArticle = useSelector((state: IrootReducer) => state.publishArticle.errors);

    const commentsOfArticle = useSelector((state: IrootReducer) => state.commentsArticle.data.comments);
    const requestAddCommentStatus = useSelector((state: IrootReducer) => state.addCommentArticle.requesting);
    const requestFollowAuthorStatus = useSelector((state: IrootReducer) => state.followAuthorArticle.requesting);
    const requestFavorite = useSelector((state: IrootReducer) => state.favorites.requesting);
    const requestDelete = useSelector((state: IrootReducer) => state.deleteArticle.requesting);
    const errorCommentArticle = useSelector((state: IrootReducer) => state.addCommentArticle.errors);
    const requestLoginStatus = useSelector((state: IrootReducer) => state.login.requesting);
    const errorLogin = useSelector((state: IrootReducer) => state.login.errors);
    const requestSignupStatus = useSelector((state: IrootReducer) => state.signup.requesting);
    const errorSignup = useSelector((state: IrootReducer) => state.signup.errors);
    const infoUser = useSelector((state: IrootReducer) => state.user.data.user);
    const requestSettingsStatus = useSelector((state: IrootReducer) => state.settings.requesting);
    const errorSettings = useSelector((state: IrootReducer) => state.settings.errors);
    const profile = useSelector((state: IrootReducer) => state.fetchProfileUser.data.profile);

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
        fetchProfileUserRequest,
        tagArticleState,
        publishArticleState,
        detailArticle,
        errorPublishArticle,
        commentsOfArticle,
        requestAddCommentStatus,
        requestFollowAuthorStatus,
        requestFavorite,
        requestDelete,
        errorCommentArticle,
        requestLoginStatus,
        errorLogin,
        requestSignupStatus,
        errorSignup,
        infoUser,
        requestSettingsStatus,
        errorSettings,
        profile
    }
}

export default useArticle;