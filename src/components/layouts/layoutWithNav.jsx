import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

// components
import Header from "../common/header";
import Footer from "../common/footer";
import Modal from "../login-register/modal";

// style
import style from "./layouts.module.css";

const LayoutWithNav = () => {
  const showLoginModal = useSelector((state) => state.loginModal.show);
  return (
    <>
      <Header />
      {showLoginModal && <Modal />}
      <div className={style.content}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default LayoutWithNav;
