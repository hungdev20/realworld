import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import axios from "axios";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch} from "react-redux";
import { requestFetchArticles } from "../../../state/articles/actions";
import { SET_STATE_DEFAULT } from "../../../state/articles/detail/constants"
function Sidebar() {
  const dispatch = useDispatch(); 
  const cx = classNames.bind(styles); 
  const [tags, setTags] = useState<any[]>([]);
 
  useEffect(() => {
    axios(`https://api.realworld.io/api/tags`).then((res) => {
      setTags(res.data.tags);
    });
  }, []);

  return (
      <div className={cx("sidebar")}>
        <p>Popular Tags</p>
        <div className={cx("tag-list")}>
          {tags.map((tag, index) => (
            <Link
              key={index}
              to=""
              className={cx("tag-default", "tag-pill", "tag-item")}
              onClick={() => {
                {
                  dispatch(requestFetchArticles({
                    tab: "",
                    tag: tag
                  }))
                  dispatch({ type: SET_STATE_DEFAULT })
                }
              }}
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    )
  };

export default Sidebar;
