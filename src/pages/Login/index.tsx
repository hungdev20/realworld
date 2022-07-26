
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import Form from "react-bootstrap/Form";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useArticle from "../../hooks/useArticle";


const cx = classNames.bind(styles);

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginRequest, errorLogin, requestLoginStatus } = useArticle();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  let errors: any = [];
  if (errorLogin != undefined) {
    errors = Object.entries(errorLogin);
  }

  const handleLogin = (e: any) => {
    e.preventDefault();

    const payload = {
      email: email,
      password: password,
      navigate
    }
    console.log(payload);

    dispatch(loginRequest(payload));
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("auth-page")}>
        <div className={cx("container", "page")}>
          <Form className={cx("form-login")} onSubmit={handleLogin}>
            <h1 className={cx("title")}>Sign in</h1>
            <Link className={cx("register")} to="/register">
              Need an account?
            </Link>

            <ul className={cx("error-messages")}>
              {errors != null ? errors.map((error: any, index: number) => (
                <li
                  className={cx("error")}
                  key={index}
                >
                  {error[0] + " " + error[1][0]}
                </li>
              )) : ""}
            </ul>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                size="lg"
                type="email"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                size="lg"
                type="password"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
            {requestLoginStatus ?
              <button className={cx("btn-login", "btn-lg", "btn-primary")}
                disabled
              >Sign in</button>
              :
              <button className={cx("btn-login", "btn-lg", "btn-primary")}
              >Sign in</button>
            }

          </Form>
        </div>
      </div>
    </div >
  );
}

export default Login;

