import { useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShopping,
  faChair,
  faCopyright,
  faHouse,
  faRightFromBracket,
  faShop,
  faUsers,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

// components
import ToggleAsideBtn from "./toggleAsideBtn";

// style
import style from "../../pages/dashboard/dashboard.module.css";

// assets
import fullLogo from "../../assets/logos/logo-header.png";

const navLinks = [
  {
    id: 0,
    to: "/dashboard",
    icon: faHouse,
    name: "Home",
  },
  {
    id: 1,
    to: "/dashboard/users",
    icon: faUsers,
    name: "Users",
  },
  {
    id: 2,
    to: "/dashboard/orders",
    icon: faBasketShopping,
    name: "Orders",
  },
  {
    id: 3,
    to: "/dashboard/products",
    icon: faShop,
    name: "Products",
  },
  {
    id: 4,
    to: "/dashboard/brands",
    icon: faCopyright,
    name: "Brands",
  },
  {
    id: 5,
    to: "/dashboard/categories",
    icon: faChair,
    name: "Categories",
  },
];

const NavAside = ({ isSmallScreen, collapsed, onToggleAside }) => {
  const [active, setActive] = useState("Home");
  const navigate = useNavigate();
  const navToggleBtn = useRef();

  function handleLogout() {
    localStorage.removeItem("userToken");
    navigate("/");
  }

  return (
    <aside
      className={`${style.aside} sticky-top bg-white py-lg-4 pe-3 pe-lg-0 d-flex flex-column`}
    >
      {!isSmallScreen && (
        <ToggleAsideBtn collapsed={collapsed} onToggleAside={onToggleAside} />
      )}
      <div className="d-flex justify-content-between py-2 py-lg-0 align-items-center d-lg-block">
        <Link
          className="navbar-brand d-inline-block align-self-start mx-3"
          to="/"
        >
          <img
            src={fullLogo}
            alt="logo"
            className={`${style["logo"]} d-block img-fluid`}
          />
        </Link>
        {isSmallScreen && (
          <button
            className="btn border text-dark d-inline-block"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#dash-nav"
            aria-controls="dash-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            ref={navToggleBtn}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        )}
      </div>
      <div
        id="dash-nav"
        className={`${isSmallScreen && "collapse"} ${style["h-lg-100"]}`}
      >
        <div
          className={`${style["h-lg-100"]} d-flex flex-column flex-fill justify-content-between pb-4 pb-lg-0`}
        >
          <nav className="py-3 pt-lg-4">
            <ul className="list-unstyled mb-0 pt-lg-4">
              {navLinks.map((ele) => (
                <li
                  key={ele.id}
                  className={`nav-item position-relative ${style["nav-item"]} pe-2 ps-3 ps-lg-2 mb-2 mb-lg-3`}
                  onClick={() => setActive(ele.name)}
                  title={ele.name}
                >
                  <NavLink
                    className={`${style["dash-navlink"]} ${
                      active === ele.name && style.active
                    } dash-navlink nav-link rounded-2 px-2 py-2 d-block d-flex ${
                      collapsed
                        ? "justify-content-center gap-0"
                        : "justify-content-start gap-2"
                    } align-items-center`}
                    onClick={() =>
                      isSmallScreen ? navToggleBtn.current.click() : ""
                    }
                    to={ele.to}
                    end
                  >
                    <FontAwesomeIcon icon={ele.icon} />
                    <span
                      className={`${collapsed ? style.collpase : ""} ${
                        style.title
                      }`}
                    >
                      {ele.name}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <button
            onClick={handleLogout}
            className={`btn ${style["dash-btn"]} ${
              collapsed ? "mx-auto" : "ms-3"
            } align-self-start lh-1  rounded-2 px-2 py-2 d-flex align-items-center gap-2`}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            <span className={`${collapsed ? "d-none" : ""}`}>Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default NavAside;
