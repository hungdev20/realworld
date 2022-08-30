
import Header from "./Header";
import Footer from "./Footer";

function DefaultLayout({ children }: { children: any }) {

  return (
    <div className="wrapper">
      <Header />
      <div className="wp-content"
      //  style={{ minHeight: "560px" }}
       >
        <div className="content">{children}</div>
      </div>
      <Footer /> 
    </div>
  );
}

export default DefaultLayout;
