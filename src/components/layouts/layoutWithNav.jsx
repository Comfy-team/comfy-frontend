import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

// components
import Header from "../common/header";
import Footer from "../common/footer";
import Modal from "../login-register/modal";
import BottomNav from "../common/bottomNav";

const LayoutWithNav = () => {
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const showLoginModal = useSelector((state) => state.loginModal.show);
  const cart = useSelector((state) => state.cart.cart);

  useLayoutEffect(() => {
    function updateSize() {
      setIsMediumScreen(window.innerWidth <= 991 ? true : false);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [window.innerWidth]);

  return (
    <>
      <Header cart={cart} isMediumScreen={isMediumScreen} />
      {showLoginModal && <Modal />}
      <Outlet />
      {isMediumScreen && <BottomNav cart={cart} />}
      <Footer />
    </>
  );
};

export default LayoutWithNav;
