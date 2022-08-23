import classNames from "classnames/bind";
import styles from "./Articles.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from 'react-bootstrap/Card';
import moment from "moment";

import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { fetchDetailArticleRequest } from "../../state/articles/detail/actions"
import { fetchCommentsRequest, addCommentRequest, deleteCommentRequest } from "../../state/articles/comments/actions";
import { IrootReducer } from "../../index-reducer";
import { followAuthorRequest } from "../../state/articles/follow/actions"
import { favoriteArticleRequest } from "../../state/articles/favourites/actions"
import { deleteArticleRequest } from "../../state/articles/actions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faPen, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { SET_STATE_DEFAULT } from "../../state/articles/detail/constants";


function DetailArticle() {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cx = classNames.bind(styles);
    const username = localStorage.getItem("username");
    const token = Boolean(localStorage.getItem("token"));
    const [comment, setComment] = useState("");

    const faPropIcon = faHeart as IconProp;
    const faPropIcon1 = faPlus as IconProp;
    const faPropIcon2 = faTrashCan as IconProp;
    const faPropIcon3 = faPen as IconProp;
    let slug: string = params.slug!;

    const detailArticle = useSelector((state: IrootReducer) => state.detailArticle.data.article);
    const commentsOfArticle = useSelector((state: IrootReducer) => state.commentsArticle.data.comments);
    const requestStatus = useSelector((state: IrootReducer) => state.addCommentArticle.requesting);
    const requestFollowAuthorStatus = useSelector((state: IrootReducer) => state.followAuthorArticle.requesting);
    const requestFavorite = useSelector((state: IrootReducer) => state.favorites.requesting);
    const requestDelete = useSelector((state: IrootReducer) => state.deleteArticle.requesting);
    const errorMessages = useSelector((state: IrootReducer) => state.addCommentArticle.errors);

    const [follow, setFollow] = useState<any>(null);
    const [favorited, setFavorited] = useState<any>(null);

    let errors: any = [];
    if (errorMessages != undefined) {
        errors = Object.entries(errorMessages);
    }

    useEffect(() => {
        setFollow(detailArticle ? detailArticle?.author?.following : follow)
    }, [detailArticle])

    useEffect(() => {
        setFavorited(detailArticle ? detailArticle.favorited : favorited)
    }, [detailArticle])

    const handleComment = (e: any) => {
        e.preventDefault();
        const payload = {
            param: slug,
            body: comment
        }
        dispatch(addCommentRequest(payload))
        setComment("")
    };

    const handleDeleteComment = (slug: string | undefined, id: number) => {
        dispatch(deleteCommentRequest({
            param: slug,
            id: id
        }))
    }
    const handleFollowAuthor = (username: string | undefined, following: boolean, param: string | undefined) => {
        let method = "post";
        following ? method = "delete" : method = "post";
        dispatch(followAuthorRequest({
            username,
            method,
            param
        }))
        setFollow(!following)
    }

    useEffect(() => {
        dispatch(fetchDetailArticleRequest(slug))
    }, [])


    useEffect(() => {
        dispatch(fetchCommentsRequest(slug))
    }, [])

    return (
        <div className={cx("article-page")}>
            {detailArticle && follow !== null ?
                <>

                    <div className={cx("banner")}>
                        <div className={cx("container")}>
                            <h1 className={cx("title")}>
                                {detailArticle.title}
                            </h1>
                            <div className={cx("article-actions")}>
                                <Link
                                    to={"/@" + detailArticle?.author?.username}
                                    className={cx("avatar")}
                                >
                                    <img
                                        src={detailArticle?.author?.image}
                                        alt={detailArticle?.author?.username}
                                    />
                                </Link>
                                <div className={cx("info")}>
                                    <Link
                                        to={"/@" + detailArticle?.author?.username}
                                        className={cx("author")}
                                    >
                                        {detailArticle?.author?.username}
                                    </Link>
                                    <span className={cx("date")}>{moment(detailArticle.createdAt).format("MMMM D, YYYY")}</span>
                                </div>
                                <div className={cx("actions-btn")}>
                                    {token ?
                                        detailArticle?.author?.username === username ?
                                            <Link to={"/editor/" + detailArticle.slug}
                                                className={cx("btn", "follow", "btn-sm", "btn-outline-secondary")}
                                            >
                                                <FontAwesomeIcon icon={faPropIcon3} />
                                                <span className={cx("action")}>
                                                    Edit Article
                                                </span>
                                            </Link>

                                            :
                                            <button
                                                onClick={() => handleFollowAuthor(detailArticle?.author?.username, follow, detailArticle?.slug)}
                                                className={cx("follow", "btn-sm",
                                                    follow && requestFollowAuthorStatus === false ? "btn-secondary"
                                                        : "btn-outline-secondary")}
                                                disabled={requestFollowAuthorStatus}
                                            >
                                                <FontAwesomeIcon icon={faPropIcon1} />
                                                <span className={cx("action")}>
                                                    {follow && requestFollowAuthorStatus === false ?
                                                        "Unfollow " + detailArticle?.author?.username
                                                        : "Follow " + detailArticle?.author?.username
                                                    }
                                                </span>
                                            </button>

                                        :

                                        <Link to="/register"
                                            className={cx("follow", "btn-sm",
                                                detailArticle?.author?.following ? "btn-secondary"
                                                    : "btn-outline-secondary")}
                                        >
                                            <FontAwesomeIcon icon={faPropIcon1} />
                                            <span className={cx("action")}>
                                                {detailArticle?.author?.following ?
                                                    "Unfollow " + detailArticle?.author?.username
                                                    : "Follow " + detailArticle?.author?.username
                                                }
                                            </span>
                                        </Link>

                                    }


                                    {token ?
                                        detailArticle?.author?.username === username ?
                                            <button
                                                className={cx("favorite", "btn-sm", "btn-outline-danger")}
                                                onClick={() => {
                                                    dispatch(deleteArticleRequest({
                                                        slug: detailArticle?.slug,
                                                        navigate
                                                    }));
                                                    dispatch({ type: SET_STATE_DEFAULT })
                                                }}
                                                disabled={requestDelete}
                                            >
                                                <FontAwesomeIcon icon={faPropIcon2} />
                                                <span className={cx("action")}>
                                                    Delete Article
                                                </span>

                                            </button>
                                            :
                                            <button
                                                className={cx("favorite", "btn-sm", favorited && requestFavorite == false ? "btn-primary" : "btn-outline-primary")}

                                                onClick={() => {
                                                    dispatch(favoriteArticleRequest({
                                                        slug: detailArticle?.slug,
                                                        favorited: favorited,

                                                    }))
                                                    setFavorited(!favorited)
                                                }}
                                                disabled={requestFavorite}
                                            >
                                                <FontAwesomeIcon icon={faPropIcon} />
                                                <span className={cx("action")}>
                                                    {favorited && requestFavorite == false ?
                                                        "Unfavorite Article"
                                                        : "Favorite Article"
                                                    }
                                                </span>
                                                <span className={cx("count-like")}>
                                                    ({detailArticle.favoritesCount})
                                                </span>
                                            </button>
                                        :
                                        <Link to="/register"
                                            className={cx("favorite", "btn-sm", detailArticle.favorited === true ? "btn-primary" : "btn-outline-primary")}
                                        >
                                            <FontAwesomeIcon icon={faPropIcon} />
                                            <span className={cx("action")}>
                                                {detailArticle.favorited ?
                                                    "Unfavorite Article"
                                                    : "Favorite Article"
                                                }
                                            </span>
                                            <span className={cx("count-like")}>
                                                ({detailArticle.favoritesCount})
                                            </span>
                                        </Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={cx("container", "page")}>
                        <div className={cx("article-content")}>
                            <Row>
                                <Col xs={12}>
                                    <div className={cx("description")}>
                                        {detailArticle.body}
                                    </div>
                                    <ul className={cx("tag-list")}>
                                        {detailArticle.tagList ?
                                            detailArticle.tagList.map((tag: string, index: number) => (
                                                <li
                                                    key={index}
                                                    className={cx(
                                                        "tag-default",
                                                        "tag-pill",
                                                        "tag-outline"
                                                    )}
                                                >
                                                    {tag}
                                                </li>

                                            ))
                                            : ""
                                        }

                                    </ul>
                                </Col>
                            </Row>
                        </div>
                        <hr />
                        <div className={cx("article-actions")}>
                            <Link
                                to={"/@" + detailArticle?.author?.username}
                                className={cx("avatar")}
                            >
                                <img
                                    src={detailArticle?.author?.image}
                                    alt={detailArticle?.author?.username}
                                />
                            </Link>
                            <div className={cx("info")}>
                                <Link
                                    to={"/@" + detailArticle?.author?.username}
                                    className={cx("author")}
                                >
                                    {detailArticle?.author?.username}
                                </Link>
                                <span className={cx("date")}>{moment(detailArticle.createdAt).format("MMMM D, YYYY")}</span>
                            </div>
                            <div className={cx("actions-btn")}>


                                {token ?
                                    detailArticle?.author?.username === username ?
                                        <Link to={"/editor/" + detailArticle.slug}
                                            className={cx("follow", "btn-sm", "btn-outline-secondary")}
                                        >
                                            <FontAwesomeIcon icon={faPropIcon3} />
                                            <span className={cx("action")}>
                                                Edit Article
                                            </span>
                                        </Link>

                                        :
                                        <button
                                            onClick={() => handleFollowAuthor(detailArticle?.author?.username, follow, detailArticle.slug)}
                                            className={cx("follow", "btn-sm",
                                                follow && requestFollowAuthorStatus === false ? "btn-secondary"
                                                    : "btn-outline-secondary")}
                                            disabled={requestFollowAuthorStatus}
                                        >
                                            <FontAwesomeIcon icon={faPropIcon1} />
                                            <span className={cx("action")}>
                                                {follow && requestFollowAuthorStatus === false ?
                                                    "Unfollow " + detailArticle?.author?.username
                                                    : "Follow " + detailArticle?.author?.username
                                                }
                                            </span>
                                        </button>

                                    :

                                    <Link to="/register"
                                        className={cx("follow", "btn-sm",
                                            detailArticle?.author?.following ? "btn-secondary"
                                                : "btn-outline-secondary")}
                                    >
                                        <FontAwesomeIcon icon={faPropIcon1} />
                                        <span className={cx("action")}>
                                            {detailArticle?.author?.following ?
                                                "Unfollow " + detailArticle?.author?.username
                                                : "Follow " + detailArticle?.author?.username
                                            }
                                        </span>
                                    </Link>

                                }
                                {token ?
                                    detailArticle?.author?.username === username ?
                                        <button
                                            className={cx("favorite", "btn-sm", "btn-outline-danger")}
                                            onClick={() => {
                                                dispatch(deleteArticleRequest({
                                                    slug: detailArticle.slug,
                                                    navigate
                                                }));
                                                dispatch({ type: SET_STATE_DEFAULT })
                                            }}
                                            disabled={requestDelete}
                                        >
                                            <FontAwesomeIcon icon={faPropIcon2} />
                                            <span className={cx("action")}>
                                                Delete Article
                                            </span>

                                        </button>
                                        :
                                        <button
                                            className={cx("favorite", "btn-sm", favorited && requestFavorite == false ? "btn-primary" : "btn-outline-primary")}

                                            onClick={() => {
                                                dispatch(favoriteArticleRequest({
                                                    slug: detailArticle.slug,
                                                    favorited: favorited,
                                                }))
                                                setFavorited(!favorited)
                                            }}
                                            disabled={requestFavorite}
                                        >
                                            <FontAwesomeIcon icon={faPropIcon} />
                                            <span className={cx("action")}>
                                                {favorited && requestFavorite == false ?
                                                    "Unfavorite Article"
                                                    : "Favorite Article"
                                                }
                                            </span>
                                            <span className={cx("count-like")}>
                                                ({detailArticle.favoritesCount})
                                            </span>
                                        </button>
                                    :
                                    <Link to="/register"
                                        className={cx("favorite", "btn-sm", detailArticle.favorited === true ? "btn-primary" : "btn-outline-primary")}
                                    >
                                        <FontAwesomeIcon icon={faPropIcon} />
                                        <span className={cx("action")}>
                                            {detailArticle.favorited ?
                                                "Unfavorite Article"
                                                : "Favorite Article"
                                            }
                                        </span>
                                        <span className={cx("count-like")}>
                                            ({detailArticle.favoritesCount})
                                        </span>
                                    </Link>
                                }
                            </div>

                        </div>
                        <Row>
                            <Col md={{ span: 8, offset: 2 }} xs={12}>
                                <div className={cx("wp-comments")}>
                                    {token ?
                                        <Form className={cx("form-comment")} onSubmit={handleComment}>
                                            <ul className={cx("error-messages")}>
                                                {errors != null ? errors.map((error: any, index: number) => (
                                                    <li
                                                        className={cx("error")}
                                                        key={index}
                                                    >
                                                        {error[0] + " " + error[1][0]}
                                                    </li>
                                                )) : ""}

                                            </ul>
                                            <Card>
                                                <Card.Body>
                                                    <Form.Control
                                                        value={comment}
                                                        placeholder="Write a comment..."
                                                        onChange={(event) => setComment(event.target.value)}
                                                        as="textarea"
                                                        rows={4} />

                                                </Card.Body>
                                                <Card.Footer>
                                                    <img className={cx("comment-author-img")} src={detailArticle?.author?.image} alt="" />
                                                    <button className={cx("post-comment", "btn-sm", "btn-primary")}
                                                        disabled={requestStatus}
                                                    >
                                                        Post Comment
                                                    </button>
                                                </Card.Footer>
                                            </Card>
                                        </Form>
                                        :
                                        <p className={cx("auth-failed")}>
                                            <Link className={cx("app-login")} to="/login">Sign in </Link> or <Link className={cx("app-register")} to="/register">sign up </Link> to add comments on this article
                                        </p>
                                    }

                                    {commentsOfArticle ?
                                        <ul className={cx("list-comments")}>
                                            {commentsOfArticle.map((comment: any, index: number) => (
                                                <li className={cx("comment-item")}
                                                    key={index}
                                                >
                                                    <Card>
                                                        <Card.Body>
                                                            <Card.Text>
                                                                {comment.body}
                                                            </Card.Text>
                                                        </Card.Body>
                                                        <Card.Footer>
                                                            <Link to={"/@" + comment.author.username} className={cx("comment-author")}>
                                                                <img className={cx("comment-author-img")} src={comment.author.image} alt={comment.author.username} />
                                                            </Link>
                                                            <Link to={"/@" + comment.author.username} className={cx("comment-author")}>{comment.author.username}</Link>
                                                            <span className={cx("date-posted")}>{moment(comment.createdAt).format("MMMM D, YYYY")}</span>
                                                            {comment.author.username === username ?
                                                                <span className={cx("mod-options")}
                                                                    onClick={() => handleDeleteComment(detailArticle?.slug, comment.id)}
                                                                >
                                                                    <FontAwesomeIcon icon={faPropIcon2} />
                                                                </span>
                                                                : ""
                                                            }
                                                        </Card.Footer>
                                                    </Card>
                                                </li>
                                            ))}

                                        </ul>
                                        : ""
                                    }
                                </div>

                            </Col>
                        </Row>
                    </div>
                </>
                : ""
            }
        </div>);
}

export default DetailArticle;