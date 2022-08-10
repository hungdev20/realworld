import classNames from "classnames/bind";
import styles from "./User.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Articles from "../../components/Articles"

function User() {
    const cx = classNames.bind(styles);
    const faPropIcon = faGear as IconProp;

    return (
        <div className={cx("wrapper")}>
            <div className={cx("profile-page")}>
                <div className={cx("user-info")}>
                    <div className={cx("container")}>
                        <Row>
                            <Col md={{ span: 10, offset: 1 }} xs={12} >
                                <img className={cx("user-img")} src="https://api.realworld.io/images/demo-avatar.png" alt="" />
                                <h4 className={cx("username")}>
                                    manhhung2011
                                </h4>
                                <p className={cx("bio")}>
                                    A senior web developer
                                </p>
                                <Link to="/settings" className={cx("settings", "btn-sm", "btn-outline-secondary")}>
                                    <FontAwesomeIcon icon={faPropIcon} />
                                    <span className={cx("text-action")}>
                                        Edit Profile Settings
                                    </span>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className={cx("container")}>
                    <Row>
                        <Col md={{ span: 10, offset: 1 }} xs={12} >
                            <Articles />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default User;