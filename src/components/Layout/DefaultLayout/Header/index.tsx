import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
function Header() {
  return (
    <header className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("inner")}>
          <div className={cx("navbar-brand")}>
            <Link to="/">conduit</Link>
          </div>
          <ul className={cx("navbar-nav")}>
            <li className={cx("nav-item")}>
              <Link className={cx("nav-link")} to="/">Home</Link>
            </li>
            <li className={cx("nav-item")}>
              <Link className={cx("nav-link")} to="/signIn">Sign In</Link>
            </li>
            <li className={cx("nav-item")}>
              <Link className={cx("nav-link")} to="/signUp">Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
