import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { requestFetchArticles } from "../../state/articles/actions"

import axios from "axios";
import Sidebar from "../../components/Layout/DefaultLayout/Sidebar";

const cx = classNames.bind(styles);
const faPropIcon = faHeart as IconProp;

function Home() {
  const dispatch = useDispatch();
  //Get list of articles
  const articles = useSelector((state: any) => state.articlesReducer.data);

  const token = Boolean(localStorage.getItem("token"));
  const tabs = ["yourFeed", "globalFeed"];
  let typeDefault;
  token ? typeDefault = "yourFeed" : typeDefault = "globalFeed";
  const [type, setType] = useState(typeDefault);
  const payload = {
    tab: type,
    tag: ""
  }
  useEffect(() => {
    dispatch(requestFetchArticles(payload));
  }, [])
  return (
    <div className={cx("wrapper")}>
      <div className={cx("home-page")}>
        <div className={cx("banner")}>
          <div className={cx("container")}>
            <h1 className={cx("logo-font")}>conduit</h1>
            <p>A place to share the knowledge</p>
          </div>
        </div>

        <div className={cx("container", "page")}>
          <Row>
            <Col md={9}>
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
                              dispatch(requestFetchArticles(payload))
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
                    </>
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
                        setType("globalFeed");
                        dispatch(requestFetchArticles(payload))
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
                </ul>
                {articles.map((article: any) => (
                  <div className={cx("article")}>
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
                          <Button size="sm">
                            <FontAwesomeIcon icon={faPropIcon} />
                            <span className={cx("count-like")}>
                              {article.favoritesCount}
                            </span>
                          </Button>
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
                ))}

              </div>
            </Col>
            <Col md={3}>
              <Sidebar />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Home;
