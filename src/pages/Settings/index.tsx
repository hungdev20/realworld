import classNames from "classnames/bind";
import styles from "./Settings.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGOUT_REQUEST } from "../../state/login/constants";
import useArticle from "../../hooks/useArticle";


function Settings() {
    const { updateSettingsRequest, requestSettingsStatus, errorSettings, infoUser } = useArticle();

    interface infoUser {
        username: string;
        password: string;
        image: string;
        bio: string;
        email: string;
    }
    const navigate = useNavigate();
    const cx = classNames.bind(styles);
    const dispatch = useDispatch();
    const prevUsername = infoUser?.username;
    const [image, setImage] = useState(infoUser != undefined ? infoUser.image : "");
    const [username, setUsername] = useState(infoUser != undefined ? infoUser.username : "");
    const [bio, setBio] = useState(infoUser != undefined ? infoUser.bio : "");
    const [email, setEmail] = useState(infoUser != undefined ? infoUser.email : "");
    const [password, setPassword] = useState(infoUser != undefined ? infoUser.password : "");


    let errors: any = [];
    if (errorSettings != undefined) {
        errors = Object.entries(errorSettings);
    }

    const handleUpdateSettings = (e: any) => {
        e.preventDefault();
        const payload = {
            email,
            username,
            bio,
            image,
            password,
            prevUsername,
            navigate
        }
        dispatch(updateSettingsRequest(payload));
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("settings-page")}>
                <div className={cx("container", "page")}>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }} xs={12} >
                            <Form className={cx("form-publish-article")} onSubmit={handleUpdateSettings}>
                                <h1 className="text-center">Your Settings</h1>
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
                                <Form.Group className="mb-3" controlId="image">
                                    <Form.Control
                                        type="text"
                                        defaultValue={infoUser != undefined ? infoUser.image : ""}
                                        placeholder="URL of profile picture"
                                        onChange={(event) => setImage(event.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Control
                                        type="text"
                                        defaultValue={infoUser != undefined ? infoUser.username : ""}
                                        size="lg"
                                        placeholder="Username"
                                        onChange={(event) => setUsername(event.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="bio">
                                    <Form.Control
                                        placeholder="Short bio about you"
                                        size="lg"
                                        defaultValue={infoUser != undefined ? infoUser.bio : ""}
                                        onChange={(event) => setBio(event.target.value)}
                                        as="textarea"
                                        rows={8} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Control
                                        type="email"
                                        size="lg"
                                        defaultValue={infoUser != undefined ? infoUser.email : ""}
                                        placeholder="Email"
                                        onChange={(event) => setEmail(

                                            event.target.value
                                        )}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Control
                                        type="password"
                                        size="lg"
                                        defaultValue={infoUser != undefined ? infoUser.password : ""}
                                        placeholder="New Password"
                                        onChange={(event) => setPassword(
                                            event.target.value
                                        )}
                                    />
                                </Form.Group>
                                {requestSettingsStatus ?
                                    <button className={cx("update-settings", "btn-lg")}
                                        disabled
                                    >
                                        Update Settings
                                    </button>
                                    :
                                    <button className={cx("update-settings", "btn-lg")}
                                    >
                                        Update Settings
                                    </button>
                                }
                                <div style={{ clear: "both" }}></div>
                            </Form>
                            <div className={cx("line-separate")}></div>
                            <button className={cx("btn-outline-danger", "btn-logout")}
                                onClick={() => dispatch({ type: LOGOUT_REQUEST, navigate })}
                            >
                                Or click here to logout
                            </button>

                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default Settings;

