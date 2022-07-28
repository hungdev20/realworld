import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Sidebar() {
  const cx = classNames.bind(styles);
  const [tags, setTags] = useState<any[]>([]);
  const [typeTag, setTypeTag] = useState<any>("");
  useEffect(() => {
    axios(`https://api.realworld.io/api/tags`).then((res) => {
      setTags(res.data.tags);
    });
  }, []);
  return {
    typeTag,
    render:(
    <div className={cx("sidebar")}>
      <p>Popular Tags</p>
      <div className={cx("tag-list")}>
        {tags.map((tag, index) => (
          <Link
            to=""
            className={cx("tag-default", "tag-pill", "tag-item")}
            onClick={() => setTypeTag(tag)}
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  )};
}
export default Sidebar;
