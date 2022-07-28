import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

function Login() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("auth-page")}>
        <div className={cx("container", "page")}>
          <Form className={cx("form-login")}>
            <h1 className={cx("title")}>Sign in</h1>
            <Link className={cx("register")} to="/register">
              Need an account?
            </Link>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                size="lg"
                type="email"
                placeholder="Email"
                //   onChange={(event) => setUsername(event.target.value)}
              />
              {/* <small id="usernameerror" className="text-danger form-text">
                  {usernameError}
                </small> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                size="lg"
                type="password"
                placeholder="Password"
                //   onChange={(event) => setPassword(event.target.value)}
              />
              {/* <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small> */}
              {/* <small id="error" className="text-danger form-text">
                  {error}
                </small> */}
            </Form.Group>

            <button className={cx("btn-login")}>Sign in</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
