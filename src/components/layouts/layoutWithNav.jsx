import { Outlet } from "react-router-dom";

// components
import Header from "../common/header";
import Footer from "../common/footer";

// style
import style from "./layouts.module.css";

const LayoutWithNav = () => {
  return (
    <>
      <Header />
      <div className={style.content}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default LayoutWithNav;
