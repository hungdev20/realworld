import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import requestSignup from "../../state/signup/actions"
const cx = classNames.bind(styles);

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const errorMessages = useSelector((state) => state.signupReducer.errors.errors);
  let errors: any = [];
  if (errorMessages != undefined) {
    errors = Object.entries(errorMessages);
  }
  const handleSignup = (e: any) => {
    e.preventDefault();
    const payload = {
      username: username,
      email: email,
      password: password
    }
    dispatch(requestSignup(payload, navigate));
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("auth-page")}>
        <div className={cx("container", "page")}>
          <Form className={cx("form-signup")}>
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
              {/* <small id="error" className="text-danger form-text">
                  {error}
                </small> */}
            </Form.Group>

            <button className={cx("btn-register")} onClick={handleSignup}>Sign up</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
