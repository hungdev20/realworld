import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import Form from "react-bootstrap/Form";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useArticle from "../../hooks/useArticle";
const cx = classNames.bind(styles);

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { requestSignup, requestSignupStatus, errorSignup} = useArticle();

  const [password, setPassword] = useState("");  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  let errors: any = [];
  if (errorSignup != undefined) {
    errors = Object.entries(errorSignup);
  }

  const handleSignup = (e: any) => {
    e.preventDefault();
    const payload = {
      username: username,
      email: email,
      password: password,
    } 
    dispatch(requestSignup(payload, navigate)); 
  };
  
  return (
    <div className={cx("wrapper")}>
      <div className={cx("auth-page")}>
        <div className={cx("container", "page")}>
          <Form className={cx("form-signup")} onSubmit={handleSignup}>
            <h1 className={cx("title")}>Sign up</h1>
            <Link className={cx("login")} to="/login">
              Have an account?
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

            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Control
                size="lg"
                type="text"
                placeholder="Username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>
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
            {requestSignupStatus ?
              <button className={cx("btn-register", "btn-lg")}
                disabled
              >Sign up</button>
              :
              <button className={cx("btn-register", "btn-lg")}
              >Sign up</button>
            }

          </Form>
        </div>
      </div>
    </div >
  );
}

export default Register;
