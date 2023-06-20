import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import style from "./checkout.module.css";
import "../../App.css";
import logoimg from "../../assets/logos/logo-header.png";
import FormComonent from "./FormComonent";
import { useNavigate } from "react-router-dom";

import ShoppingCardComponent from "./ShoppingCardComponent";
import PaymentMethod from "./paymentMethod"; // import the component

const Checkout = () => {
  const [activeComponent, setActiveComponent] = useState("form");
  const [formData, setFormData] = useState("");
  const navigate = useNavigate();
  console.log("formData");
  console.log(formData);

  const handleFormData = thedata => {
    console.log("thedata");
    console.log(thedata);
    setActiveComponent("shipping");
    setFormData(thedata);
  };
  console.log("formData", formData);
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
  }, [location]);

  useEffect(() => {
    console.log("formData");
    console.log(formData);
  }, [formData]);

  return (
    <div className={`${style.checkout} ml-5 ml-md-3 `}>
      <div className={`${style.checkoutContainer}  mt-2 `}>
        <img
          src={logoimg}
          alt=""
          style={{ width: "6rem", marginLeft: "15px" }}
          className={`{} mb-3 `}
        />
        <div
          className={`${style[("checkoutSmalContainer", "firstrow")]} row  `}
        >
          <div
            className={`${style.leftFormColum} col-12 col-md-6 col-lg-6 mr-3  mb-3 ml-5 `}
          >
            <div className="ml-5 bg-body">
              <nav
                className={`${style.breadcrumb} --bs-breadcrumb-divider: >`}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/cart" className="breadlink">
                      Cart
                    </a>
                  </li>
                  <li
                    className={`breadcrumb-item text-primary ${
                      activeComponent === "form" ? "active" : ""
                    }`}
                  >
                    {" "}
                    information
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
              <PaymentMethod data={formData} />
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
