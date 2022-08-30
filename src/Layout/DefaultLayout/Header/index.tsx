import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faGear, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { IrootReducer } from "../../../index-reducer";
import { actionUserRequest } from "../../../state/user/actions";
import { SET_STATE_DEFAULT } from "../../../state/articles/detail/constants";
import { SET_TAG_DEFAULT } from "../../../state/articles/tags/constants";
import { SET_STATE_PUBLISH_DEFAULT } from "../../../state/articles/publish/constants";

function Header() {
  const cx = classNames.bind(styles);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let activeClassName = "active";
  const token = Boolean(localStorage.getItem("token"));
  const faPropIcon = faPenToSquare as IconProp;
  const faPropIcon1 = faGear as IconProp;
  const user = useSelector((state: IrootReducer) => state.user.data?.user);
  const username = user?.username;
  useEffect(() => {
    if (token) {
      dispatch(actionUserRequest({
        method: "get",
        navigate
      }))
    }
  }, [])

  return (
    <header className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("inner")}>
          <div className={cx("navbar-brand")}>
            <Link to="/"
              onClick={() => {
                {
                  dispatch({ type: SET_STATE_DEFAULT })
                }
              }}
            >conduit</Link>
          </div>
          <ul className={cx("navbar-nav")}>
            <li className={cx("nav-item")}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? cx(activeClassName) : undefined
                }
                onClick={() => {
                  {
                    dispatch({ type: SET_STATE_DEFAULT })
                  }
                }}
                to="/"
              >
                Home
              </NavLink>
            </li>
            {username && token ?
              <>
                <li className={cx("nav-item")}>
                  <FontAwesomeIcon icon={faPropIcon} />
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? cx(activeClassName) : undefined
                    }
                    to="/editor"
                    onClick={() => {
                      {
                        dispatch({ type: SET_STATE_PUBLISH_DEFAULT })
                        dispatch({ type: SET_TAG_DEFAULT })
                      }
                    }}
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
                    onClick={() => {
                      {
                        dispatch({ type: SET_STATE_PUBLISH_DEFAULT })
                        dispatch({ type: SET_TAG_DEFAULT })
                      }
                    }}
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
                    onClick={() => {
                      {
                        dispatch({ type: SET_STATE_DEFAULT })
                      }
                    }}
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
