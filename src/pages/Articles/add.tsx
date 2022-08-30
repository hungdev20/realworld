import classNames from "classnames/bind";
import styles from "./Articles.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import useArticle from "../../hooks/useArticle";

const AddArticle = () => {
    const cx = classNames.bind(styles);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const faPropIcon = faXmark as IconProp;

    const { requestAddArticle,
        editArticleRequest,
        addTagRequest,
        removeTagRequest,
        fetchDetailArticleRequest,
        tagArticleState,
        publishArticleState,
        detailArticle,
        errorPublishArticle
    } = useArticle()

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("")
    const [tagList, setTagList] = useState<string[]>([]);
    let slug: string = params.slug!;
    useEffect(() => {
        if (slug) {
            dispatch(fetchDetailArticleRequest(slug))
        }
    }, [slug])


    const requestStatus = publishArticleState.requesting;

    let errors: any = [];
    if (errorPublishArticle != undefined) {
        errors = Object.entries(errorPublishArticle);
    }
    const handleAddTag = (ev: any) => {
        if (ev.key === 'Enter') {
            ev.preventDefault();
            dispatch(addTagRequest({
                tag: ev.target.value,
                tagList: tagArticleState.tagList,
                navigate: navigate
            }))
            setTagList(tagArticleState.tagList);
            setTag("")
        }
    }

    const handleRemoveTag = (index: number) => {
        dispatch(removeTagRequest({
            tagList: tagArticleState.tagList,
            navigate: navigate,
            index
        }))
    }

    const handlePublishArticle = (e: any) => {

        e.preventDefault();
        const payload = {
            title,
            description,
            body,
            tagList,
            navigate
        }
        dispatch(requestAddArticle(payload));
    };

    const handleUpdateArticle = (e: any) => {
        e.preventDefault();
        if (slug && detailArticle !== "") {
            let payload = {
                article: detailArticle,
                navigate
            }

            payload!.article!.body = body ? body : detailArticle?.body;
            payload!.article!.description = description ? description : detailArticle?.description;
            payload!.article!.tagList = tagList === [] ? tagList : detailArticle?.tagList;
            payload!.article!.title = title ? title : detailArticle?.title;
            payload!.article!.updatedAt = "2022-08-11T10:26:16.366Z";

            dispatch(editArticleRequest(payload));
        }
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("editor-page")}>
                <div className={cx("container", "page")}>
                    <Row>
                        <Col md={{ span: 10, offset: 1 }} xs={12} >
                            <Form className={cx("form-publish-article")} onSubmit={slug ? handleUpdateArticle : handlePublishArticle}>
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
                                <Form.Group className="mb-3" controlId="title">
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Article Title"
                                        defaultValue={(detailArticle && slug) ? detailArticle.title : ""}
                                        onChange={(event) => setTitle(event.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="body">
                                    <Form.Control
                                        type="text"
                                        placeholder="What's this article body?"
                                        defaultValue={(detailArticle && slug) ? detailArticle.body : ""}
                                        onChange={(event) => setBody(event.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Control
                                        placeholder="Write your article (in markdown)"
                                        defaultValue={(detailArticle && slug) ? detailArticle.description : ""}
                                        onChange={(event) => setDescription(event.target.value)}
                                        as="textarea"
                                        rows={8} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="tags">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter tags"
                                        value={tag}
                                        onChange={(e) => setTag(e.target.value)}
                                        onKeyDown={(ev) => ev.key === 'Enter' && ev.preventDefault()}
                                        onKeyUp={(e) => handleAddTag(e)}
                                    />

                                    {tagArticleState.tagList ?
                                        <div className={cx("tag-list")}>
                                            {tagArticleState.tagList.map((tag: string, index: number) => (
                                                <span
                                                    key={index}
                                                    className={cx("tag", "tag-default", "tag-pill")}

                                                >
                                                    <FontAwesomeIcon icon={faPropIcon}
                                                        onClick={() => handleRemoveTag(index)}
                                                    />
                                                    {tag}
                                                </span>
                                            ))}

                                        </div>
                                        : ""


                                    }
                                </Form.Group>
                                <button className={cx("add-article", "btn-lg")}
                                    disabled={requestStatus}>
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


