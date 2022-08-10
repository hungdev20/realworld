

import classNames from "classnames/bind";
import styles from "./Articles.module.scss";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import { requestFetchArticles } from "../../state/articles/actions"
import { favoriteArticleRequest } from "../../state/articles/favourites/actions"
function Articles() {
    const params = useParams();
    let user: string = params.user!;
    const cx = classNames.bind(styles);
    const faPropIcon = faHeart as IconProp;
    const dispatch = useDispatch();
    const token = Boolean(localStorage.getItem("token"));
    const tabs = ["yourFeed", "globalFeed", "myArticles", "favoritedArticles"];
    let typeDefault;
    if (user) {
        token ? typeDefault = "yourFeed" : typeDefault = "globalFeed";
    } else {
        typeDefault = "myArticles"
    }
    const [type, setType] = useState(typeDefault);
    const payload = {
        tab: type,
        tag: ""
    }
    //Get list of articles
    const articles = useSelector((state: any) => state.articles.data);
    useEffect(() => {
        dispatch(requestFetchArticles(payload));
    }, [])
    const requesting = useSelector((state: any) => state.articles.requesting);
    return (
        <div className={cx("feed-toggle")}>
            <ul className={cx("nav")}>

                {token ?
                    <>
                        <li
                            key="yourFeed"
                            className={cx("nav-item")}
                        >
                            <Link
                                to=""
                                className={cx("nav-link")}
                                onClick={() => {
                                    {
                                        setType("yourFeed");
                                        dispatch(requestFetchArticles({
                                            tab: "yourFeed",
                                            tag: ""
                                        }))
                                    }
                                }}

                                style={
                                    type === tabs[0]
                                        ? {
                                            background: "#fff",
                                            borderBottom: "2px solid #5cb85c",
                                            color: "#5cb85c",
                                        }
                                        : {}
                                }
                            >
                                Your Feed
                            </Link>
                        </li>
                        <li
                            key="globalFeed"
                            className={cx("nav-item")}
                        >
                            <Link
                                to=""
                                className={cx("nav-link")}
                                onClick={() => {
                                    {
                                        setType("globalFeed");
                                        dispatch(requestFetchArticles({
                                            tab: "globalFeed",
                                            tag: ""
                                        }))
                                    }
                                }}

                                style={
                                    type === tabs[1]
                                        ? {
                                            background: "#fff",
                                            borderBottom: "2px solid #5cb85c",
                                            color: "#5cb85c",
                                        }
                                        : {}
                                }
                            >
                                Global Feed
                            </Link>
                        </li>
                    </>
                    : ''

                }
            </ul>
            {
                requesting ?
                    <span style={{
                        display: "block",
                        borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                        padding: "1.5rem 0"
                    }}>Loading articles...</span>

                    :
                    <>
                        {articles != [] ?
                            articles.map((article: any, index: number) => (
                                <div className={cx("article")} key={index}>
                                    <div className={cx("article-preview")}>
                                        <div className={cx("article-meta")}>
                                            <div className={cx("wp-info")}>
                                                <Link
                                                    to={"/@" + article.author.username}
                                                    className={cx("profile")}
                                                >
                                                    <img
                                                        src={article.author.image}
                                                        alt={article.author.username}
                                                    />
                                                </Link>
                                                <div className={cx("info")}>
                                                    <Link
                                                        to={"/@" + article.author.username}
                                                        className={cx("author")}
                                                    >
                                                        {article.author.username}
                                                    </Link>
                                                    <span className={cx("date")}>{article.created_at}</span>
                                                </div>
                                            </div>
                                            <div className={cx("favorite-btn")}>
                                                <button
                                                    className={
                                                        article.favorited ? cx("favorited") : undefined
                                                    }
                                                    onClick={() => {
                                                        dispatch(favoriteArticleRequest({
                                                            slug: article.slug,
                                                            favorited: article.favorited
                                                        }))
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faPropIcon} />
                                                    <span className={cx("count-like")}>
                                                        {article.favoritesCount}
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                        <Link to={"/article/" + article.slug} className={cx("preview-link")}>
                                            <h1 className={cx("title")}>{article.title}</h1>
                                            <p className={cx("description")}>{article.description}</p>
                                            <div className={cx("actions")}>
                                                <span className={cx("read-more")}>Read more...</span>
                                                <ul className={cx("tag-list")}>
                                                    {article.tagList.map((tag: string, index: number) => (
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
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))

                            :
                            <span style={{
                                display: "block",
                                borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                                padding: "1.5rem 0"
                            }}>No articles are here... yet.</span>


                        }

                    </>
            }

        </div >
    );
}

export default Articles;