import classNames from "classnames/bind";
import styles from "./Articles.module.scss";
import { Link, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from 'react-bootstrap/Card';

import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { fetchDetailArticleRequest } from "../../state/articles/detail/actions"
import { fetchCommentsRequest, addCommentRequest, deleteCommentRequest } from "../../state/articles/comments/actions"
import { followAuthorRequest } from "../../state/articles/follow/actions"
import { favoriteArticleRequest } from "../../state/articles/favourites/actions"
import { deleteArticleRequest } from "../../state/articles/actions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faPen, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import moment from "moment";

function DetailArticle() {
    const cx = classNames.bind(styles);
    const username = localStorage.getItem("username");
    const token = Boolean(localStorage.getItem("token"));
    const [comment, setComment] = useState("");
    const [commentPayload, setCommentPayload] = useState(comment);
    const faPropIcon = faHeart as IconProp;
    const faPropIcon1 = faPlus as IconProp;
    const faPropIcon2 = faTrashCan as IconProp; 
    const faPropIcon3 = faPen as IconProp;
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let slug: string = params.slug!;
    const detailArticle = useSelector((state: any) => state.detailArticle.data.article);
    const commentsOfArticle = useSelector((state: any) => state.commentsArticle.data.comments);
    const requestStatus = useSelector((state: any) => state.addCommentArticle.requesting);
    const requestFollowAuthorStatus = useSelector((state: any) => state.followAuthorArticle.requesting);
    const requestFavorite = useSelector((state: any) => state.favorites.requesting);
    const errorMessages = useSelector((state: any) => state.addCommentArticle.errors.errors);

    let errors: any = [];
    if (errorMessages != undefined) {
        errors = Object.entries(errorMessages);
    }

    const handleComment = (e: any) => {
        e.preventDefault();
        const payload = {
            param: slug,
            body: comment
        }
        // setCommentPayload(comment)
        dispatch(addCommentRequest(payload))
        setComment("")
    };

    const handleDeleteComment = (slug: string, id: number) => {
        dispatch(deleteCommentRequest({
            param: slug,
            id: id
        }))
    }

    const handleFollowAuthor = (username: string, following: boolean, param: string) => {
        let method = "post";
        following ? method = "delete" : method = "post";
        dispatch(followAuthorRequest({
            username,
            method,
            param
        }))
    }
    useEffect(() => {
        dispatch(fetchDetailArticleRequest(slug))
    }, [])


    useEffect(() => {
        dispatch(fetchCommentsRequest(slug))
    }, [commentPayload])

    return (
        <div className={cx("article-page")}>
            {detailArticle ?
                <>

                    <div className={cx("banner")}>
                        <div className={cx("container")}>
                            <h1 className={cx("title")}>
                                {detailArticle.title}
                            </h1>
                            <div className={cx("article-actions")}>
                                <Link
                                    to={"/@" + detailArticle.author.username}
                                    className={cx("avatar")}
                                >
                                    <img
                                        src={detailArticle.author.image}
                                        alt={detailArticle.author.username}
                                    />
                                </Link>
                                <div className={cx("info")}>
                                    <Link
                                        to={"/@" + detailArticle.author.username}
                                        className={cx("author")}
                                    >
                                        {detailArticle.author.username}
                                    </Link>
                                    <span className={cx("date")}>{moment(detailArticle.createdAt).format("MMMM D, YYYY")}</span>
                                </div>
                                <div className={cx("actions-btn")}>

                                    {requestFollowAuthorStatus ?
                                        <button
                                            onClick={() => handleFollowAuthor(detailArticle.author.username, detailArticle.author.following, detailArticle.slug)}
                                            className={cx("btn", "follow", "btn-sm",
                                                detailArticle.author.following ? "btn-secondary"
                                                    : "btn-outline-secondary")}
                                            disabled
                                        >
                                            <FontAwesomeIcon icon={faPropIcon1} />
                                            <span>
                                                {detailArticle.author.following ?
                                                    "Unfollow " + detailArticle.author.username
                                                    : "Follow " + detailArticle.author.username
                                                }
                                            </span>
                                        </button>

                                        :
                                        token ?
                                            detailArticle.author.username === username ?
                                                <Link to={"/editor/" + detailArticle.slug}
                                                    onClick={() => handleFollowAuthor(detailArticle.author.username, detailArticle.author.following, detailArticle.slug)}
                                                    className={cx("btn", "follow", "btn-sm", "btn-outline-secondary")}
                                                >
                                                    <FontAwesomeIcon icon={faPropIcon3} />
                                                    <span>
                                                        Edit Article
                                                    </span>
                                                </Link>

                                                :
                                                <button
                                                    onClick={() => handleFollowAuthor(detailArticle.author.username, detailArticle.author.following, detailArticle.slug)}
                                                    className={cx("btn", "follow", "btn-sm",
                                                        detailArticle.author.following ? "btn-secondary"
                                                            : "btn-outline-secondary")}
                                                >
                                                    <FontAwesomeIcon icon={faPropIcon1} />
                                                    <span>
                                                        {detailArticle.author.following ?
                                                            "Unfollow " + detailArticle.author.username
                                                            : "Follow " + detailArticle.author.username
                                                        }
                                                    </span>
                                                </button>

                                            :

                                            <Link to="/register"
                                                onClick={() => handleFollowAuthor(detailArticle.author.username, detailArticle.author.following, detailArticle.slug)}
                                                className={cx("btn", "follow", "btn-sm",
                                                    detailArticle.author.following ? "btn-secondary"
                                                        : "btn-outline-secondary")}
                                            >
                                                <FontAwesomeIcon icon={faPropIcon1} />
                                                <span>
                                                    {detailArticle.author.following ?
                                                        "Unfollow " + detailArticle.author.username
                                                        : "Follow " + detailArticle.author.username
                                                    }
                                                </span>
                                            </Link>

                                    }
                                    {requestFavorite ?
                                        <button
                                            disabled
                                            className={cx("btn", "favorite", "btn-sm", detailArticle.favorited === true ? "btn-primary" : "btn-outline-primary")}
                                        >
                                            <FontAwesomeIcon icon={faPropIcon} />
                                            <span>
                                                {detailArticle.favorited ?
                                                    "Unfavorite Article"
                                                    : "Favorite Article"
                                                }
                                            </span>
                                            <span className={cx("count-like")}>
                                                ({detailArticle.favoritesCount})
                                            </span>
                                        </button>
                                        :

                                        token ?
                                            detailArticle.author.username === username ?
                                                <button
                                                    className={cx("btn", "favorite", "btn-sm", "btn-outline-danger")}
                                                    onClick={() => {
                                                        dispatch(deleteArticleRequest(detailArticle.slug, navigate))
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faPropIcon2} />
                                                    <span>
                                                        Delete Article
                                                    </span>

                                                </button>
                                                :
                                                <button
                                                    className={cx("btn", "favorite", "btn-sm", detailArticle.favorited === true ? "btn-primary" : "btn-outline-primary")}

                                                    onClick={() => {
                                                        dispatch(favoriteArticleRequest({
                                                            slug: detailArticle.slug,
                                                            favorited: detailArticle.favorited
                                                        }))
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faPropIcon} />
                                                    <span>
                                                        {detailArticle.favorited ?
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
                                                className={cx("btn", "favorite", "btn-sm", detailArticle.favorited === true ? "btn-primary" : "btn-outline-primary")}
                                            >
                                                <FontAwesomeIcon icon={faPropIcon} />
                                                <span>
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
                                        {detailArticle.tagList.map((tag: string, index: number) => (
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

                                        ))}

                                    </ul>
                                </Col>
                            </Row>
                        </div>
                        <hr />
                        <div className={cx("article-actions")}>
                            <Link
                                to={"/@" + detailArticle.author.username}
                                className={cx("avatar")}
                            >
                                <img
                                    src={detailArticle.author.image}
                                    alt={detailArticle.author.username}
                                />
                            </Link>
                            <div className={cx("info")}>
                                <Link
                                    to={"/@" + detailArticle.author.username}
                                    className={cx("author")}
                                >
                                    {detailArticle.author.username}
                                </Link>
                                <span className={cx("date")}>{moment(detailArticle.createdAt).format("MMMM D, YYYY")}</span>
                            </div>
                            <div className={cx("actions-btn")}>

                                {requestFollowAuthorStatus ?
                                    <button
                                        onClick={() => handleFollowAuthor(detailArticle.author.username, detailArticle.author.following, detailArticle.slug)}
                                        className={cx("btn", "follow", "btn-sm",
                                            detailArticle.author.following ? "btn-secondary"
                                                : "btn-outline-secondary")}
                                        disabled
                                    >
                                        <FontAwesomeIcon icon={faPropIcon1} />
                                        <span>
                                            {detailArticle.author.following ?
                                                "Unfollow " + detailArticle.author.username
                                                : "Follow " + detailArticle.author.username
                                            }
                                        </span>
                                    </button>

                                    :
                                    token ?
                                        detailArticle.author.username === username ?
                                            <Link to={"editor/" + detailArticle.slug}
                                                onClick={() => handleFollowAuthor(detailArticle.author.username, detailArticle.author.following, detailArticle.slug)}
                                                className={cx("btn", "follow", "btn-sm", "btn-outline-secondary")}
                                            >
                                                <FontAwesomeIcon icon={faPropIcon3} />
                                                <span>
                                                    Edit Article
                                                </span>
                                            </Link>

                                            :
                                            <button
                                                onClick={() => handleFollowAuthor(detailArticle.author.username, detailArticle.author.following, detailArticle.slug)}
                                                className={cx("btn", "follow", "btn-sm",
                                                    detailArticle.author.following ? "btn-secondary"
                                                        : "btn-outline-secondary")}
                                            >
                                                <FontAwesomeIcon icon={faPropIcon1} />
                                                <span>
                                                    {detailArticle.author.following ?
                                                        "Unfollow " + detailArticle.author.username
                                                        : "Follow " + detailArticle.author.username
                                                    }
                                                </span>
                                            </button>

                                        :

                                        <Link to="/register"
                                            onClick={() => handleFollowAuthor(detailArticle.author.username, detailArticle.author.following, detailArticle.slug)}
                                            className={cx("btn", "follow", "btn-sm",
                                                detailArticle.author.following ? "btn-secondary"
                                                    : "btn-outline-secondary")}
                                        >
                                            <FontAwesomeIcon icon={faPropIcon1} />
                                            <span>
                                                {detailArticle.author.following ?
                                                    "Unfollow " + detailArticle.author.username
                                                    : "Follow " + detailArticle.author.username
                                                }
                                            </span>
                                        </Link>

                                }
                                {requestFavorite ?
                                    <button
                                        disabled
                                        className={cx("btn", "favorite", "btn-sm", detailArticle.favorited === true ? "btn-primary" : "btn-outline-primary")}
                                    >
                                        <FontAwesomeIcon icon={faPropIcon} />
                                        <span>
                                            {detailArticle.favorited ?
                                                "Unfavorite Article"
                                                : "Favorite Article"
                                            }
                                        </span>
                                        <span className={cx("count-like")}>
                                            ({detailArticle.favoritesCount})
                                        </span>
                                    </button>
                                    :

                                    token ?
                                        detailArticle.author.username === username ?
                                            <button
                                                className={cx("btn", "favorite", "btn-sm", "btn-outline-danger")}
                                                onClick={() => {
                                                    dispatch(deleteArticleRequest(detailArticle.slug, navigate))
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faPropIcon2} />
                                                <span>
                                                    Delete Article
                                                </span>

                                            </button>
                                            :
                                            <button
                                                className={cx("btn", "favorite", "btn-sm", detailArticle.favorited === true ? "btn-primary" : "btn-outline-primary")}

                                                onClick={() => {
                                                    dispatch(favoriteArticleRequest({
                                                        slug: detailArticle.slug,
                                                        favorited: detailArticle.favorited
                                                    }))
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faPropIcon} />
                                                <span>
                                                    {detailArticle.favorited ?
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
                                            className={cx("btn", "favorite", "btn-sm", detailArticle.favorited === true ? "btn-primary" : "btn-outline-primary")}
                                        >
                                            <FontAwesomeIcon icon={faPropIcon} />
                                            <span>
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
                                                    <img className={cx("comment-author-img")} src={detailArticle.author.image} alt="" />
                                                    {/* {requestStatus ?
                                                    <button className={cx("post-comment", "btn-sm", "btn-primary")}
                                                        disabled
                                                    >
                                                        Post Comment
                                                    </button>
                                                    :
                                                    <button className={cx("post-comment", "btn-sm", "btn-primary")}
                                                    >
                                                        Post Comment
                                                    </button>
                                                } */}
                                                    <button className={cx("post-comment", "btn-sm", "btn-primary")}
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
                                                                    onClick={() => handleDeleteComment(detailArticle.slug, comment.id)}
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