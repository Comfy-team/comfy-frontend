import { NavLink } from "react-router-dom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import logo1 from "../../assets/logos/logo-5.png";

const Header = () => {
  return (
    <header style={{ height: "100px", textAlign: "center" }}>
      <nav
        className="navbar navbar-expand-md border-bottom border-bottom-dark"
        data-bs-theme="light"
      >
        <div className="container-fluid">
          <img src={logo1} alt="" style={{ width: "10rem" }} className="ml-5" />

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
          >
            <div className="navbar-nav mx-auto gap-5">
              {/** ------------------------------ */}
              <div className="dropdown nav-link fs-5">
                <NavLink
                  className="nav-link fs-5"
                  to="/"
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dropdown
                </NavLink>

                <div
                  className="dropdown-menu d-none d-lg-none mt-0 dropdown-menu-lg"
                  aria-labelledby="dropdownMenuButton"
                >
                  <div className="container " style={{ width: "20rem" }}>
                    <div className="row">
                      <div className="col-sm-6">
                        <h6 className="dropdown-header">Column 1</h6>
                        <a className="dropdown-item" href="#">
                          Link 1
                        </a>
                        <a className="dropdown-item" href="#">
                          Link 2
                        </a>
                        <a className="dropdown-item" href="#">
                          Link 3
                        </a>
                      </div>
                      <div className="col-sm-6">
                        <h6 className="dropdown-header">Column 2</h6>
                        <a className="dropdown-item" href="#">
                          Link 4
                        </a>
                        <a className="dropdown-item" href="#">
                          Link 5
                        </a>
                        <a className="dropdown-item" href="#">
                          Link 6
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/** ------------------------------ */}
              </div>
              {/** ------------------------------ */}
              <div className="dropdown nav-link fs-5">
                <NavLink
                  className="nav-link fs-5"
                  to="/"
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dropdown
                </NavLink>

                <div
                  className="dropdown-menu d-none d-lg-none mt-0"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a class="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </div>
              {/** ------------------------------ */}
              <div className="dropdown nav-link fs-5">
                <NavLink
                  className="nav-link fs-5"
                  to="/"
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dropdown
                </NavLink>

                <div
                  className="dropdown-menu d-none d-lg-none mt-0"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a class="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </div>
              {/** ------------------------------ */}
              <div className="dropdown nav-link fs-5">
                <NavLink
                  className="nav-link fs-5"
                  to="/"
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dropdown
                </NavLink>

                <div
                  className="dropdown-menu d-none d-lg-none mt-0"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a class="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </div>
              {/** ------------------------------ */}
              <div className="dropdown nav-link fs-5">
                <NavLink
                  className="nav-link fs-5"
                  to="/"
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dropdown
                </NavLink>

                <div
                  className="dropdown-menu d-none d-lg-none mt-0"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a class="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </div>

              <div className="Register-nav">
                <NavLink className="nav-link fs-5" to="/faq">
                  login/Register
                </NavLink>{" "}
                <FontAwesomeIcon
                  icon={faLock}
                  className="outlined-icon"
                  style={{ color: "#5b5d62" }}
                />
              </div>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="outlined-icon"
              />
              <FontAwesomeIcon icon={faLock} />
              <FontAwesomeIcon
                icon={faCartShopping}
                className="outlined-icon"
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
