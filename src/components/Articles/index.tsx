

import classNames from "classnames/bind";
import styles from "./Articles.module.scss";
import moment from "moment";

import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { requestFetchArticles } from "../../state/articles/actions";
import { favoriteArticleRequest } from "../../state/articles/favourites/actions";
import { SET_STATE_DEFAULT } from "../../state/articles/detail/constants";

function Articles(props: any) {
    const cx = classNames.bind(styles);
    const dispatch = useDispatch();
    const params = useParams();
    let user: string = params.user!;
    const faPropIcon = faHeart as IconProp;
    const token = Boolean(localStorage.getItem("token"));
    const tabs = ["yourFeed", "globalFeed", "myArticles", "favoritedArticles"];

    //set Type for each tab
    let typeDefault;
    if (user) {
        typeDefault = "myArticles"
    } else {
        token ? typeDefault = "yourFeed" : typeDefault = "globalFeed";
    }
    
    const [type, setType] = useState(typeDefault);
    const [activeId, setActiveId] = useState<any>(null);

    //Get list of articles
    const articleState = useSelector((state: any) => state.articles)
    const articles = articleState.data;
    
    const payload = {
        tab: type,
        tag: "",
        author: user ? props.author : ""
    }
    useEffect(() => {
        dispatch(requestFetchArticles(payload));
    }, [])

    const requesting = articleState.requesting;
    const favoriteArticleState = useSelector((state: any) => state.favorites)
    const favoriteRequestStatus = favoriteArticleState.requesting;
    let detailArticle = useSelector((state: any) => state.detailArticle.data.article);
    
    if (detailArticle) {
        if (detailArticle.slug === articles[activeId].slug) {
            articles[activeId] = detailArticle
        }
    }

    return (
        <div className={cx("feed-toggle")}>
            <ul className={cx("nav")}>
                {user ?
                    <>
                        <li
                            key="myArticles"
                            className={cx("nav-item")}
                        >
                            <Link
                                to=""
                                className={cx("nav-link")}
                                onClick={() => {
                                    {
                                        setType("myArticles");
                                        dispatch(requestFetchArticles({
                                            tab: "myArticles",
                                            tag: "",
                                            author: props.author
                                        }))
                                        setActiveId(null)
                                        dispatch({ type: SET_STATE_DEFAULT })
                                    }
                                }}

                                style={
                                    type === tabs[2]
                                        ? {
                                            background: "#fff",
                                            borderBottom: "2px solid #5cb85c",
                                            color: "#5cb85c",
                                        }
                                        : {}
                                }
                            >
                                My Articles
                            </Link>
                        </li>
                        <li
                            key="favoritedArticles"
                            className={cx("nav-item")}
                        >
                            <Link
                                to=""
                                className={cx("nav-link")}
                                onClick={() => {
                                    {
                                        setType("favoritedArticles");
                                        dispatch(requestFetchArticles({
                                            tab: "favoritedArticles",
                                            tag: "",
                                            author: props.author
                                        }))
                                        setActiveId(null)
                                        dispatch({ type: SET_STATE_DEFAULT })

                                    }
                                }}

                                style={
                                    type === tabs[3]
                                        ? {
                                            background: "#fff",
                                            borderBottom: "2px solid #5cb85c",
                                            color: "#5cb85c",
                                        }
                                        : {}
                                }
                            >
                                Favorited Articles
                            </Link>
                        </li>
                    </>

                    :

                    <>
                        {token ?
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
                                            setActiveId(null)
                                            dispatch({ type: SET_STATE_DEFAULT })

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
                            : ''
                        }
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
                                        setActiveId(null)
                                        dispatch({ type: SET_STATE_DEFAULT })


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
                        {articles.length > 0 ?
                            articles.map((article: any, index: any) => (
                                detailArticle ?
                                    detailArticle.slug === article.slug ? 


                                        <div className={cx("article")} key={index} id={index} >
                                            <div className={cx("article-preview")}>
                                                <div className={cx("article-meta")}>
                                                    <div className={cx("wp-info")}>
                                                        <Link
                                                            to={"/@" + detailArticle.author.username}
                                                            className={cx("profile")}
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
                                                    </div>
                                                    <div className={cx("favorite-btn")}>
                                                        {token ?

                                                            <button
                                                                className={
                                                                    cx("btn-favor", detailArticle.favorited ? "favorited" : undefined
                                                                    )
                                                                }
                                                                onClick={() => {
                                                                    dispatch(favoriteArticleRequest({
                                                                        slug: article.slug,
                                                                        favorited: article.favorited,
                                                                        detail: true
                                                                    }))
                                                                    setActiveId(index)

                                                                }}
                                                                disabled={activeId === index && favoriteRequestStatus}
                                                            >
                                                                <FontAwesomeIcon icon={faPropIcon} />
                                                                <span className={cx("count-like")}>
                                                                    {detailArticle.favoritesCount}
                                                                </span>
                                                            </button>
                                                            :
                                                            <Link to="/register"
                                                                className={
                                                                    cx("btn-favor", detailArticle.favorited ? "favorited" : undefined)
                                                                }
                                                            >
                                                                <FontAwesomeIcon icon={faPropIcon} />
                                                                <span className={cx("count-like")}>
                                                                    {detailArticle.favoritesCount}
                                                                </span>
                                                            </Link>
                                                        }
                                                    </div>
                                                </div>
                                                <Link to={"/article/" + detailArticle.slug} className={cx("preview-link")}>
                                                    <h1 className={cx("title")}>{detailArticle.title}</h1>
                                                    <p className={cx("description")}>{detailArticle.description}</p>
                                                    <div className={cx("actions")}>
                                                        <span className={cx("read-more")}>Read more...</span>
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
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                        :
                                        <div className={cx("article")} key={index} id={index}>
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
                                                            <span className={cx("date")}>{moment(article.createdAt).format("MMMM D, YYYY")}</span>
                                                        </div>
                                                    </div>
                                                    <div className={cx("favorite-btn")}>
                                                        {token ?
                                                        
                                                            <button
                                                                className={
                                                                    cx("btn-favor", article.favorited ? "favorited" : undefined
                                                                    )
                                                                }
                                                                onClick={() => {
                                                                    dispatch(favoriteArticleRequest({
                                                                        slug: article.slug,
                                                                        favorited: article.favorited,
                                                                        detail: true
                                                                    }))
                                                                    setActiveId(index)

                                                                }}
                                                                disabled={activeId === index && favoriteRequestStatus}
                                                            >
                                                                <FontAwesomeIcon icon={faPropIcon} />
                                                                <span className={cx("count-like")}>
                                                                    {article.favoritesCount}
                                                                </span>
                                                            </button>
                                                            :
                                                            <Link to="/register"
                                                                className={
                                                                    cx("btn-favor", article.favorited ? "favorited" : undefined)
                                                                }
                                                            >
                                                                <FontAwesomeIcon icon={faPropIcon} />
                                                                <span className={cx("count-like")}>
                                                                    {article.favoritesCount}
                                                                </span>
                                                            </Link>
                                                        }
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
                                    :

                                    <div className={cx("article")} key={index} id={index}>
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
                                                        <span className={cx("date")}>{moment(article.createdAt).format("MMMM D, YYYY")}</span>
                                                    </div>
                                                </div>
                                                <div className={cx("favorite-btn")}>
                                                    {token ?
                                                       
                                                        <button
                                                            className={
                                                                cx("btn-favor", article.favorited ? "favorited" : undefined
                                                                )
                                                            }
                                                            onClick={() => {
                                                                dispatch(favoriteArticleRequest({
                                                                    slug: article.slug,
                                                                    favorited: article.favorited,
                                                                    detail: true
                                                                }))
                                                                setActiveId(index)

                                                            }}
                                                            disabled={activeId === index && favoriteRequestStatus}
                                                        >
                                                            <FontAwesomeIcon icon={faPropIcon} />
                                                            <span className={cx("count-like")}>
                                                                {article.favoritesCount}
                                                            </span>
                                                        </button>
                                                        :
                                                        <Link to="/register"
                                                            className={
                                                                cx("btn-favor", article.favorited ? "favorited" : undefined)
                                                            }
                                                        >
                                                            <FontAwesomeIcon icon={faPropIcon} />
                                                            <span className={cx("count-like")}>
                                                                {article.favoritesCount}
                                                            </span>
                                                        </Link>
                                                    }
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

