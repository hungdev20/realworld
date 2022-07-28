import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Sidebar from "../../components/Layout/DefaultLayout/Sidebar";

const cx = classNames.bind(styles);
const faPropIcon = faHeart as IconProp;

function Home() {
  const tabs = ["yourFeed", "globalFeed"];
  const [type, setType] = useState("yourFeed");
  const [listGlobalFeed, setListGlobalFeed] = useState<any[]>([]);
  const {render, typeTag} = Sidebar();
  useEffect(() => {
    let arg = "";
    type === "yourFeed" ? (arg = "articles/feed") : (arg = "articles");
    let paramTypeTag = "";
    typeTag != ""
      ? (paramTypeTag = `&tag=${typeTag}`)
      : (paramTypeTag = "");
    axios(
      `https://api.realworld.io/api/${arg}?limit=10&offset=0${paramTypeTag}`
    ).then((res) => {
      setListGlobalFeed(res.data.articles);
    });
  }, [type, typeTag]);

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
                  <li
                    key="yourFeed"
                    className={cx("nav-item")}
                    onClick={() => setType("yourFeed")}
                  >
                    <Link
                      to=""
                      className={cx("nav-link")}
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
                    onClick={() => setType("globalFeed")}
                  >
                    <Link
                      to=""
                      className={cx("nav-link")}
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
                {listGlobalFeed.map((feed, index) => (
                  <div className={cx("article")}>
                    <div className={cx("article-preview")}>
                      <div className={cx("article-meta")}>
                        <div className={cx("wp-info")}>
                          <Link
                            to={feed.author.username}
                            className={cx("profile")}
                          >
                            <img
                              src={feed.author.image}
                              alt={feed.author.username}
                            />
                          </Link>
                          <div className={cx("info")}>
                            <Link
                              to={feed.author.username}
                              className={cx("author")}
                            >
                              {feed.author.username}
                            </Link>
                            <span className={cx("date")}>{feed.createdAt}</span>
                          </div>
                        </div>
                        <div className={cx("favorite-btn")}>
                          <Button size="sm">
                            <FontAwesomeIcon icon={faPropIcon} />
                            <span className={cx("count-like")}>
                              {feed.favoritesCount}
                            </span>
                          </Button>
                        </div>
                      </div>
                      <Link to={feed.slug} className={cx("preview-link")}>
                        <h1 className={cx("title")}>{feed.title}</h1>
                        <p className={cx("description")}>{feed.description}</p>
                        <div className={cx("actions")}>
                          <span className={cx("read-more")}>Read more...</span>
                          <ul className={cx("tag-list")}>
                            {feed.tagList.map((tag: any) => (
                              <li
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
              {render}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Home;
