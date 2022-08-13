import classNames from "classnames/bind";
import styles from "./User.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faGear, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { followAuthorRequest } from "../../state/articles/follow/actions"
import { fetchProfileUserRequest } from "../../state/user/actions"
import Articles from "../../components/Articles"

function User() {
    const username = localStorage.getItem("username");
    const token = Boolean(localStorage.getItem("token"));
    const cx = classNames.bind(styles);
    const faPropIcon = faGear as IconProp;
    const faPropIcon1 = faPlus as IconProp;

    const dispatch = useDispatch();
    const params = useParams();

    let user: string = params.user!;
    const profile = useSelector((state: any) => state.fetchProfileUser.data.profile);

    const handleFollowAuthor = (username: string, following: boolean) => {
        let method = "post";
        following ? method = "delete" : method = "post";
        dispatch(followAuthorRequest({
            username,
            method
        }))
    }

    useEffect(() => {
        dispatch(fetchProfileUserRequest(user))
    }, [user])
    
    return (
        <div className={cx("wrapper")}>
            {profile ?
                <div className={cx("profile-page")}>

                    <div className={cx("user-info")}>
                        <div className={cx("container")}>
                            <Row>
                                <Col md={{ span: 10, offset: 1 }} xs={12} >
                                    <img className={cx("user-img")} src={profile.image} alt={profile.username} />
                                    <h4 className={cx("username")}>
                                        {profile.username}
                                    </h4>
                                    <p className={cx("bio")}>
                                        {profile.bio}
                                    </p>

                                    {username === profile.username ?
                                        <Link to="/settings" className={cx("settings", "btn-sm", "btn-outline-secondary")}>
                                            <FontAwesomeIcon icon={faPropIcon} />
                                            <span className={cx("action")}>
                                                Edit Profile Settings
                                            </span>
                                        </Link>
                                        :

                                        token ?
                                            <button
                                                onClick={() => handleFollowAuthor(profile.username, profile.following)}
                                                className={cx("btn", "follow", "btn-sm", "settings",
                                                    profile.following ? "btn-secondary"
                                                        : "btn-outline-secondary")}
                                            >
                                                <FontAwesomeIcon icon={faPropIcon1} />
                                                <span>
                                                    {profile.following ?
                                                        "Unfollow " + profile.username
                                                        : "Follow " + profile.username
                                                    }
                                                </span>
                                            </button>

                                            :
                                            <Link to="/register"
                                                onClick={() => handleFollowAuthor(profile.username, profile.following)}
                                                className={cx("btn", "follow", "btn-sm", "settings",
                                                    profile.following ? "btn-secondary"
                                                        : "btn-outline-secondary")}
                                            >
                                                <FontAwesomeIcon icon={faPropIcon1} />
                                                <span>
                                                    {profile.following ?
                                                        "Unfollow " + profile.username
                                                        : "Follow " + profile.username
                                                    }
                                                </span>
                                            </Link>

                                    }
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <div className={cx("container")}>
                        <Row>
                            <Col md={{ span: 10, offset: 1 }} xs={12} >
                                <Articles
                                    author={profile.username}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
                : ""
            }
        </div>
    );
}

export default User;