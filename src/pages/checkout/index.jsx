import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ShoppingCardComponent from "./ShoppingCardComponent";
import FormComonent from "./FormComonent";
import PaymentMethod from "./paymentMethod";
import logoimg from "../../assets/logos/logo-header.png";
import "../../App.css";
import style from "./checkout.module.css";

const Checkout = () => {
  const [activeComponent, setActiveComponent] = useState("form");
  const [formData, setFormData] = useState("");
  const navigate = useNavigate();

  const handleFormData = thedata => {
    setActiveComponent("shipping");
    setFormData(thedata);
  };

  const location = useLocation();
  useEffect(() => {
    // set the active component based on the current location
    if (location.pathname.includes("information")) {
      setActiveComponent("form");
    } else if (location.pathname.includes("shipping")) {
      setActiveComponent("shipping");
    } else if (location.pathname.includes("checkout")) {
      navigate("/checkout/information");
      setActiveComponent("form");
    }
  }, [location, navigate]);
  const token = localStorage.getItem("userToken");

  useEffect(() => {}, [formData]);

  return (
    <div className={`${style.checkout} ml-5 ml-md-3 `}>
      <div className={`${style.checkoutContainer}  mt-2 `}>
        <a href="/home" className="logo">
          <img
            src={logoimg}
            alt=""
            style={{ width: "6rem", marginLeft: "15px" }}
            className={`{} mb-3 `}
          />{" "}
        </a>
        <div
          className={`${style[("checkoutSmalContainer", "firstrow")]} row  `}
        >
          <div
            className={`${style.leftFormColum} col-12 col-md-6 col-lg-6 mr-3  mb-3 ml-5 `}
          >
            <div className="ml-5 bg-body">
              <nav
                className={`${style.breadcrumb} ${
                  activeComponent === "form" ? "active" : ""
                } --bs-breadcrumb-divider: >`}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/cart" className="breadlink">
                      Cart
                    </a>
                  </li>
                  <li className="breadcrumb-item">
                    <a
                      href="/checkout/information"
                      className={`breadcrumb-item ${
                        activeComponent === "form" ? "active" : ""
                      }`}
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
            {activeComponent === "form" && (
              <FormComonent onFormSubmit={handleFormData} />
            )}
            {activeComponent === "shipping" && (
              <PaymentMethod formData={formData} token={token} />
            )}
          </div>
          <div
            className={`${style.rightorderColumn} col-12 col-md-6 col-lg-6  bg-primary `}
          >
            <ShoppingCardComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
