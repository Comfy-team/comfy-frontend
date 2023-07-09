import { Link, Outlet } from "react-router-dom";
import React from "react";
//components
import ShoppingCardComponent from "./ShoppingCardComponent";
import logoimg from "../../assets/logos/logo-header.png";
//style
import style from "./checkout.module.css";
import Breadcrumbcomponant from "../../components/checkout/Breadcrumbcomponant";

const Checkout = () => {
  return (
    <div className={`${style.checkout} ml-5 ml-md-3  `}>
      <div className={`${style.checkoutContainer}  mt-2  ms-0   `}>
        <Link to="/home" className="logo">
          <img
            src={logoimg}
            alt=""
            style={{ width: "6rem" }}
            className={`${style.logoCheckout} mt-3 `}
          />{" "}
        </Link>
        <div className={`${style.checkoutSmalContainer} row mt-5 `}>
          <div
            className={`${style.leftFormColum}  col-lg-6 col-md-12  col-12 mr-3  mb-3 ml-5 px-sm-0 px-md-5 `}
          >
            <div className="mb-4 ms-4">
              <Breadcrumbcomponant />
            </div>

            <Outlet> </Outlet>
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
