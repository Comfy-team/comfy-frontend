import { Outlet } from "react-router-dom";
import React from "react";
//components
import ShoppingCardComponent from "./ShoppingCardComponent";
import logoimg from "../../assets/logos/logo-header.png";
//style
import "../../App.css";
import style from "./checkout.module.css";

const Checkout = () => {
  return (
    <div className={`${style.checkout} ml-5 ml-md-3 `}>
      <div className={`${style.checkoutContainer}  mt-2  ms-0  `}>
        <a href="/home" className="logo">
          <img
            src={logoimg}
            alt=""
            style={{ width: "6rem", marginLeft: "15px" }}
            className={`{} mb-3 `}
          />{" "}
        </a>
        <div className={`${style.checkoutSmalContainer} row mt-5 `}>
          <div
            className={`${style.leftFormColum}  col-lg-6 col-md-6  col-12 mr-3  mb-3 ml-5 `}
          >
            <div className="ms-4 mb-4">
              <nav
                className={`${style.breadcrumb}  --bs-breadcrumb-divider: >`}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/cart" className={` ${style.none} breadlink`}>
                      Cart
                    </a>
                  </li>
                  <li className="breadcrumb-item">
                    <a
                      href="/checkout/information"
                      className={`breadcrumb-item ${style.none}
                  `}
                    >
                      information
                    </a>
                  </li>
                  <li
                    className={`breadcrumb-item "
                    }`}
                    aria-current="page"
                  >
                    shipping
                  </li>
                </ol>
              </nav>
            </div>

            <Outlet> </Outlet>
          </div>
          <div
            className={`${style.rightorderColumn} col-lg-6 col-md-6 col-12 `}
          >
            <ShoppingCardComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
