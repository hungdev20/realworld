import classNames from "classnames/bind";
import styles from "./Articles.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { requestAddArticle } from "../../state/articles/actions"

function AddArticle() {
    const cx = classNames.bind(styles);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [description, setDescription] = useState("");
    const [tagList, setTagList] = useState([]);
    const handlePublishArticle = (e: any) => {
        e.preventDefault();

        const payload = {
            title,
            description,
            body,
            tagList
        }
        dispatch(requestAddArticle(payload));
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("editor-page")}>
                <div className={cx("container", "page")}>
                    <Row>
                        <Col md={{ span: 10, offset: 1 }} xs={12} >
                            <Form className={cx("form-publish-article")} onSubmit={handlePublishArticle}>
                                <ul className={cx("error-messages")}>
                                    {/* {errors != null ? errors.map((error: any, index: number) => (
                                    <li
                                        className={cx("error")}
                                        key={index}
                                    >
                                        {error[0] + " " + error[1][0]}
                                    </li>
                                )) : ""} */}

                                </ul>
                                <Form.Group className="mb-3" controlId="title">
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Article Title"
                                    onChange={(event) => setTitle(event.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="body">
                                    <Form.Control
                                        type="text"
                                        placeholder="What's this article body?"
                                    onChange={(event) => setBody(event.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Control
                                        placeholder="Write your article (in markdown)"
                                        onChange={(event) => setDescription(event.target.value)}
                                        as="textarea"
                                        rows={8} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="tags">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter tags"
                                    // onChange={(event) => setTagList(
                                        
                                    //     event.target.value
                                    //     )}
                                    />
                                </Form.Group>
                                <button className={cx("add-article", "btn-lg")}>
                                    Publish Article
                                </button>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default AddArticle;

