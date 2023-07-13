import { Link, Outlet, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

//components
import ShoppingCardComponent from "../../components/checkout/ShoppingCardComponent";
import Breadcrumbcomponant from "../../components/checkout/Breadcrumbcomponant";
import logoimg from "../../assets/logos/logo-header.png";
//style
import style from "./checkout.module.css";

const Checkout = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("userToken");
  const cart = useSelector(state => state.cart.cart);
  useEffect(() => {
    if (!token) {
      navigate("/404", { replace: true });
      return;
    }
  });
  useEffect(() => {
    if (cart?.totalPrice === 0 || cart?.role === "admin") {
      navigate("/home", { replace: true });
      return;
    }
  });

  return (
    <div className={`${style.checkout}  `}>
      <div className={`${style.checkoutContainer}  mt-2  ms-0   `}>
        <Link to="/home" className="logo">
          <img
            src={logoimg}
            alt=" logo img"
            className={`${style.logoCheckout} mt-3`}
          />
        </Link>
        <div className={`${style.checkoutSmalContainer} row mt-5 `}>
          <div
            className={`${style.leftFormColum}  col-lg-6 col-md-12  col-12   mb-3  px-sm-0 px-md-5 `}
          >
            <div className="mb-4 ms-4">
              <Breadcrumbcomponant />
            </div>

            <Outlet />
          </div>
          <div
            className={`${style.rightorderColumn} col-lg-6 col-md-12 col-12  `}
          >
            <ShoppingCardComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
