import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import React, { useState ,useEffect} from "react";
// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUnlock,
  faMagnifyingGlass,
  faCartShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

// components
import logo from "../../assets/logos/logo-header.png";
import { showLoginModal } from "../../store/slices/loginModalSlice";

const Header = ({ isMediumScreen, cart }) => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null);
  
  const token = localStorage.getItem("userToken");
  useEffect(() => {
    console.log("Token:", token);
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        setIsLoggedIn(false);
        setDecodedToken(null);
        localStorage.removeItem("userToken");
      } else {
        setIsLoggedIn(true);
        setDecodedToken(decoded);
      }
    } else {
      setIsLoggedIn(false);
      setDecodedToken(null);
    }
  }, [token]);
  return (
    <header className="header sticky-lg-top bg-white">
      <nav
        className="navbar navbar-expand-lg border-bottom"
        data-bs-theme="light"
      >
        <div className="container-fluid">
          <Link to="/" className="nav-link">
            <img src={logo} alt="comfy logo" className="logo img-fluid" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#header-nav"
            aria-controls="header-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="header-nav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link color-main-gray hover-color-yellow fs-5"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/shop"
                  className="nav-link color-main-gray hover-color-yellow fs-5"
                >
                  shop
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about"
                  className="nav-link color-main-gray hover-color-yellow fs-5"
                >
                  about
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link color-main-gray hover-color-yellow fs-5"
                  to="/contact"
                >
                  contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link color-main-gray hover-color-yellow fs-5"
                  to="/faq"
                >
                  FAQ
                </NavLink>
              </li>
            </ul>
            {!isMediumScreen && (
              <div className="d-flex align-items-center gap-4">
                {isLoggedIn ? (
                  <Link
                    className="btn p-0 color-main-gray fs-5 hover-color-yellow"
                    to={`/account/${decodedToken.id}`}
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <span className="visually-hidden">account</span>
                  </Link>
                ) : (
                  <button
                    className="btn p-0 color-main-gray hover-color-yellow"
                    onClick={() => dispatch(showLoginModal(true))}
                  >
                    <FontAwesomeIcon icon={faUnlock} />{" "}
                    <span className="fw-semibold"> Login / Register</span>
                  </button>
                )}
                <Link
                  to="/search"
                  className="btn p-0 fs-5 color-main-gray hover-color-yellow"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                  <span className="visually-hidden">search</span>
                </Link>
                <button
                  type="button"
                  className="cart-btn btn p-0 fs-5 hover-color-yellow position-relative"
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                  <span className="visually-hidden">cart</span>
                  <span className="position-absolute bg-yellow top-0 start-0 translate-middle badge rounded-pill">
                    {cart.items
                      ? cart.items.length > 99
                        ? "99+"
                        : cart.items.length
                      : 0}
                    <span className="visually-hidden">items in cart</span>
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
