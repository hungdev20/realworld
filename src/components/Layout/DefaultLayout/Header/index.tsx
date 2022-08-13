import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faGear, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

function Header() {
  const cx = classNames.bind(styles);

  let activeClassName = "active";
  const token = Boolean(localStorage.getItem("token"));
  const username = localStorage.getItem("username");
  const faPropIcon = faPenToSquare as IconProp;
  const faPropIcon1 = faGear as IconProp;
  
  return (
    <header className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("inner")}>
          <div className={cx("navbar-brand")}>
            <Link to="/">conduit</Link>
          </div>
          <ul className={cx("navbar-nav")}>
            <li className={cx("nav-item")}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? cx(activeClassName) : undefined
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            {token ?
              <>
                <li className={cx("nav-item")}>
                  <FontAwesomeIcon icon={faPropIcon} />
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? cx(activeClassName) : undefined
                    }
                    to="/editor"
                  >
                    New Article
                  </NavLink>
                </li>
                <li className={cx("nav-item")}>
                  <FontAwesomeIcon icon={faPropIcon1} />
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? cx(activeClassName) : undefined
                    }
                    to="/settings"
                  >
                    Settings
                  </NavLink>
                </li>
                <li className={cx("nav-item")}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? cx(activeClassName) : undefined
                    }
                    to={"/@" + username}
                  >
                    {username}
                  </NavLink>
                </li>
              </>
              :
              <>
                <li className={cx("nav-item")}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? cx(activeClassName) : undefined
                    }
                    to="/login"
                  >
                    Sign in
                  </NavLink>
                </li>
                <li className={cx("nav-item")}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? cx(activeClassName) : undefined
                    }
                    to="/register"
                  >
                    Sign up
                  </NavLink>
                </li>
              </>

            }
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
