import { NavLink } from "react-router-dom";

import logo1 from "../../assets/logos/logo-5.png";

const Header = () => {
  return (
    <header>
      <nav
        className="navbar navbar-expand-md border-bottom border-bottom-dark"
        data-bs-theme="light"
      >
        <div className="container-fluid">
          <img src={logo1} alt="" style={{ width: "6rem" }} />

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
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav mx-auto gap-5">
              <NavLink className="nav-link fs-5" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link fs-5" to="/shop">
                Shop
              </NavLink>
              <NavLink className="nav-link fs-5" to="/about">
                About
              </NavLink>
              <NavLink className="nav-link fs-5" to="/contact">
                Contact
              </NavLink>
              <NavLink className="nav-link fs-5" to="/faq">
                faq
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
