import { useLayoutEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// components
import Header from "../common/header";
import Footer from "../common/footer";
import Modal from "../login-register/modal";
import BottomNav from "../common/bottomNav";
import CartModal from "./../cartModal/cartModal";
import { showCartModal } from "../../store/slices/cartModalSlice";
import ScrollToTopBtn from "../common/scrollToTopBtn";

const LayoutWithNav = () => {
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const showLoginModal = useSelector((state) => state.loginModal.show);
  const showCart = useSelector((state) => state.cartModal.show);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const handleCloseCart = () => {
    dispatch(showCartModal(false));
  };

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
      <div className="shopping-cart-container">
        {showCart && (
          <>
            <div
              className="modal-backdrop cartmodal-backdrop"
              onClick={handleCloseCart}
            ></div>
            <CartModal showModal={showCart} hideModal={handleCloseCart} />
          </>
        )}
      </div>
      <Outlet />
      <Footer />
      <ScrollToTopBtn />
      {isMediumScreen && <BottomNav cart={cart} />}
    </>
  );
};

export default LayoutWithNav;
