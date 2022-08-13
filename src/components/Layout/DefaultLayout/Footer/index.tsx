import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

function Footer() {
  const cx = classNames.bind(styles);

  return (
    
      <footer className={cx("wrapper")}>
        <div className={cx("container")}>
          <Link to="/" className={cx("logo-font")}>
            conduit
          </Link>
          <span className={cx("attribution")}>
            © 2022. An interactive learning project from
            <a href="https://thinkster.io" className={cx("author")}> Thinkster</a>
            . Code licensed under MIT.
          </span>

        </div>
      </footer>

  );
}

export default Footer;
