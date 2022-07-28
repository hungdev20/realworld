import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const cx = classNames.bind(styles);
function Header() {
  let activeClassName = "active";
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
          </ul>
          {/* <Nav
            activeKey="/"
           
          >
            <Nav.Item>
              <Nav.NavLink href="/">Home</Nav.NavLink>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/signIn">Sign in</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/signUp">Sign up</Nav.Link>
            </Nav.Item>
          </Nav> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
