import classNames from "classnames";
import styles from "./DefaultLayout.module.scss";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const cx = classNames.bind(styles);
function DefaultLayout({ children }: { children: any }) {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("wp-content")}>
        {/* <Sidebar /> */}
        <div className={cx("content")}>{children}</div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default DefaultLayout;
