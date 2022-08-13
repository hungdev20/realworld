import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Sidebar from "../../components/Layout/DefaultLayout/Sidebar";
import Articles from "../../components/Articles"

function Home() {
  const cx = classNames.bind(styles);
  let type = "";

  return (
    <div className={cx("wrapper")}> 
      <div className={cx("home-page")}>
        <div className={cx("banner")}>
          <div className={cx("container")}>
            <h1 className={cx("logo-font")}>conduit</h1>
            <p>A place to share the knowledge</p>
          </div>
        </div>

        <div className={cx("container", "page")}>
          <Row>
            <Col md={9}>
              <Articles
              />
            </Col>
            <Col md={3}>
              <Sidebar>{type}</Sidebar>
            </Col>
          </Row>
        </div>
      </div>
    </div >
  );
}

export default Home;
