import classNames from "classnames";
import styles from "./DefaultLayout.module.scss";
import Header from "./Header";
import Footer from "./Footer";

function DefaultLayout({ children }: { children: any }) {
  const cx = classNames.bind(styles);
  
  return (
    <div className={cx("wrapper")} style={{ position: "relative" }}>
      <Header />
      <div className={cx("wp-content")}>
        <div className={cx("content")}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
