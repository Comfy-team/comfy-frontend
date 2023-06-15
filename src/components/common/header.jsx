import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import logo1 from "../../assets/logos/logo-5.png";

const Header = () => {
  const [count, setCount] = useState(0);

  return (
    <header style={{ hight: "5vh", backgroundColor: "bla" }}>
      <nav
        className="navbar navbar-expand-md border-bottom border-bottom-dark"
        data-bs-theme="light"
      >
        <div className="container-fluid">
          <img
            src={logo1}
            alt=""
            style={{ width: "10rem", marginLeft: "50px" }}
            className="ml-5"
          />

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse collapse-horizontal"
            id="navbarNavAltMarkup"
            style={{ marginRight: "0px" }}
          >
            <div className="navbar-nav mx-auto gap-1">
              {/** ------------------------------ */}

              <div className="dropdown nav-link fs-5">
                <NavLink
                  to="/"
                  className="nav-link fs-5  "
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Home
                </NavLink>

                <div
                  className="dropdown-menu d-none d-lg-none mt-0 dropdown-menu-lg"
                  aria-labelledby="dropdownMenuButton"
                >
                  <div
                    className="container-fluid "
                    style={{ width: "30rem", height: "12rem" }}
                  ></div>
                </div>
                {/** ------------------------------ */}
              </div>

              {/** ------------------------------ */}
              <div className="dropdown nav-link fs-5">
                <NavLink
                  to="/shop"
                  className="nav-link fs-5  "
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  shop
                </NavLink>
              </div>
              {/** ------------------------------ */}
              <div className="dropdown nav-link fs-5">
                <NavLink
                  to="/about"
                  className="nav-link fs-5  "
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  about
                </NavLink>
              </div>
              {/** ------------------------------ */}
              <div className="dropdown nav-link fs-5">
                <NavLink
                  className="nav-link fs-5"
                  to="/contact"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  contact
                </NavLink>
              </div>
              {/** ------------------------------ */}
              <div className="dropdown nav-link fs-5">
                <NavLink
                  className="nav-link fs-5"
                  to="/faq"
                  class="
                  
                  
                  dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  FAQ
                </NavLink>
              </div>
              <div
                className="Register-nav mt-2 ml-2"
                style={{
                  color: "#5b5d62",
                  marginLeft: "150px",
                  marginRight: "20px",
                }}
              >
                <FontAwesomeIcon
                  icon={faLock}
                  className="outlined-icon  "
                  style={{ color: "#5b5d62", display: "inline" }}
                  size="lg"
                />
                <NavLink
                  className="nav-link fs-5"
                  to="/faq"
                  style={{ color: "#5b5d62", display: "inline-block" }}
                >
                  login/Register
                </NavLink>
              </div>

              <div className="mt-3 mt-2 ">
                <div
                  className="mt-3 d-inline mr-3"
                  style={{ marginTop: "10px", marginRight: "20px" }}
                >
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="outlined-icon searchIcon "
                    size="lg"
                  />
                </div>

                <div className=" cartContainer mt-3  d-inline mt-2 mr-0  ">
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    size="lg"
                    className="outlined-icon"
                  />
                  <span
                    className="cart-counter js-cart-count"
                    data-count={count}
                  >
                    {count}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
