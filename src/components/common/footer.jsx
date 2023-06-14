import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import logo1 from "../../assets/logos/logo-footer.png";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPhoneVolume,
  faEnvelope,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const [showFollowUs, setShowFollowUs] = useState(false);
  const [showHereToHelp, setShowHereToHelp] = useState(false);
  const [showCustomerService, setShowCustomerService] = useState(false);

  useEffect(() => {
    // Update state values based on screen size on component mount
    updateStates();
    // Add event listener to update state values on window resize
    window.addEventListener("resize", updateStates);
    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateStates);
    };
  }, []);

  const updateStates = () => {
    if (window.innerWidth <= 576) {
      setShowFollowUs(false);
      setShowHereToHelp(false);
      setShowCustomerService(false);
    } else {
      setShowFollowUs(true);
      setShowHereToHelp(true);
      setShowCustomerService(true);
    }
  };

  const toggleFollowUs = () => {
    if (window.innerWidth <= 576) {
      setShowFollowUs((prevState) => !prevState);
    }
  };

  const toggleHereToHelp = () => {
    if (window.innerWidth <= 576) {
      setShowHereToHelp((prevState) => !prevState);
    }
  };

  const toggleCustomerService = () => {
    if (window.innerWidth <= 576) {
      setShowCustomerService((prevState) => !prevState);
    }
  };

  return (
    <footer className=" text-secondary">
      <div className="container ">
        <div className="row footer-top ">
          <div className="col-lg-5 col-md-6 col-sm-12 mb-4">
            <img src={logo1} alt="" style={{ width: "9rem" }} />
            <br />
            <br />
            <p>
              Since 2013 we’ve been creating industrial design, residential
              architecture, commercial interiors. Chase mice attack feet but rub
              face on everything cepteur sint occaecat cupidatat proident.
            </p>
            <h6
              className="text-light footer-toggle d-sm-none"
              onClick={toggleFollowUs}
            >
              Follow Us{" "}
              <FontAwesomeIcon
                icon={faAngleDown}
                className={`icon ${showFollowUs ? "icon-rotate" : ""}`}
              />
            </h6>{" "}
            <br />
            <div
              className={`footer-content ${
                showFollowUs || window.innerWidth > 576 ? "show" : "hide"
              }`}
            >
              <h6 className="text-light d-none d-sm-block ">Follow Us</h6>
              <div className="social-icons">
                <NavLink to="/" className="me-4 link-light  hover-color-yellow">
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </NavLink>
                <NavLink to="/" className="me-4 link-light  hover-color-yellow">
                  <FontAwesomeIcon icon={faFacebookF} size="lg" />
                </NavLink>
                <NavLink to="/" className="me-4 link-light  hover-color-yellow">
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </NavLink>
                <NavLink to="/" className="me-4 link-light  hover-color-yellow">
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </NavLink>
              </div>
            </div>
           
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <h6
              className="text-light footer-toggle d-sm-none"
              onClick={toggleHereToHelp}
            >
              HERE TO HELP{" "}
              <FontAwesomeIcon
                icon={faAngleDown}
                className={`icon ${showHereToHelp ? "icon-rotate" : ""}`}
              />
            </h6>
            <h6 className="text-light d-none d-sm-block">HERE TO HELP</h6>
            <br />

            <div
              className={`footer-content ${
                showHereToHelp || window.innerWidth > 576 ? "show" : "hide"
              }`}
            >
              <div>
                <p>
                  Have a question? You may find an answer in our FAQs. But you
                  can also contact us:
                </p>
              </div>
              <div>
                <p>
                  <FontAwesomeIcon
                    icon={faPhoneVolume}
                    className="text-light"
                    size="lg"
                  />
                  <br />
                  <br />
                  <span className="text-light">Order by phone</span>
                  <br />
                  <span>Available everyday</span>
                  <br />
                  <span className="contacts">+391 (0)35 2568 4593</span>
                  <br />
                </p>
              </div>
              <div>
                <p>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-light"
                    size="lg"
                  />
                  <br />
                  <br />
                  <span className="text-light">Email Us</span>
                  <br />
                  <span>Get in touch by email</span>
                  <br />
                  <span className="contacts">hello@domain.com</span>
                  <br />
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
            <h6
              className="text-light footer-toggle d-sm-none"
              onClick={toggleCustomerService}
            >
              Customer Service{" "}
              <FontAwesomeIcon
                icon={faAngleDown}
                className={`icon ${showCustomerService ? "icon-rotate" : ""}`}
              />
            </h6>
            <h6 className="text-light d-none d-sm-block">Customer Service</h6>
            <br />
            <div
              className={`footer-content ${
                showCustomerService || window.innerWidth > 576 ? "show" : "hide"
              }`}
            >
              <div>
                <p className="menu-footer">
                  <NavLink
                    to="/"
                    className="text-secondary nav-link hover-color-yellow"
                  >
                    Contact Us
                  </NavLink>
                </p>
                <p className="menu-footer">
                  <NavLink
                    to="/"
                    className="text-secondary nav-link hover-color-yellow"
                  >
                    FAQs
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className="raw">
          <hr/>
          <div className="col-12 col-sm d-flex justify-content-start justify-content-sm-center text-center">
            <h5>
              © Copyright 2023 Comfy Store. All Rights Reserved. Design By
              Team3-ITI
            </h5>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
