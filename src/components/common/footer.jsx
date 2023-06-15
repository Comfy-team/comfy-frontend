import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

import logo1 from "../../assets/logos/logo-footer.png";

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
            <p className="pt-4">
              Since 2013 we’ve been creating industrial design, residential
              architecture, commercial interiors. Chase mice attack feet but rub
              face on everything cepteur sint occaecat cupidatat proident.
            </p>
            <h6
              className="text-light footer-toggle d-sm-none d-flex"
              onClick={toggleFollowUs}
            >
              Follow Us{" "}
              <FontAwesomeIcon
                icon={faAngleDown}
                className={`icon ${showFollowUs ? "icon-rotate" : ""}`}
              />
            </h6>{" "}
            <div
              className={`footer-content ${
                showFollowUs || window.innerWidth > 576 ? "show" : "hide"
              }`}
            >
              <h6 className="text-light d-none d-sm-block ">Follow Us</h6>
              <div className="social-icons">
                <Link to="/" className="me-4 link-light  hover-color-yellow">
                  <FontAwesomeIcon
                    icon={faTwitter}
                    size="lg"
                    className="pt-2"
                  />
                </Link>
                <Link to="/" className="me-4 link-light  hover-color-yellow">
                  <FontAwesomeIcon icon={faFacebookF} size="lg" />
                </Link>
                <Link to="/" className="me-4 link-light  hover-color-yellow">
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </Link>
                <Link to="/" className="me-4 link-light  hover-color-yellow">
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <h6
              className="text-light footer-toggle d-sm-none "
              onClick={toggleHereToHelp}
            >
              HERE TO HELP{" "}
              <FontAwesomeIcon
                icon={faAngleDown}
                className={`icon ${showHereToHelp ? "icon-rotate" : ""} `}
              />
            </h6>
            <h6 className="text-light d-none d-sm-block ">HERE TO HELP</h6>

            <div
              className={`footer-content ${
                showHereToHelp || window.innerWidth > 576 ? "show" : "hide"
              }`}
            >
              <div>
                <p className="pt-3">
                  Have a question? You may find an answer in our FAQs. But you
                  can also contact us:
                </p>
              </div>
              <div>
                <p>
                  <Link to="tel:+39103525684593">
                    <FontAwesomeIcon
                      icon={faPhoneVolume}
                      className="text-light  pt-4 pb-2 d-block hover-color-yellow"
                      size="lg"
                    />
                  </Link>
                  <span className="text-light d-block">Order by phone</span>

                  <span className="d-block">Available everyday</span>

                  <span className="contacts">
                    <Link
                      to="tel:+39103525684593"
                      className="text-secondary hover-color-yellow"
                    >
                      +391 (0)35 2568 4593
                    </Link>
                  </span>
                </p>
              </div>
              <div>
                <p>
                  <Link to="mailto:hello@domain.com">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-light  pt-4 pb-2 d-block hover-color-yellow"
                      size="lg"
                    />
                  </Link>

                  <span className="text-light d-block">Email Us</span>

                  <span className="d-block">Get in touch by email</span>

                  <span className="contacts">
                    <Link
                      to="mailto:hello@domain.com"
                      className="text-secondary hover-color-yellow"
                    >
                      hello@domain.com
                    </Link>
                  </span>
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
            <h6 className="text-light d-none d-sm-block ">Customer Service</h6>

            <div
              className={`footer-content ${
                showCustomerService || window.innerWidth > 576 ? "show" : "hide"
              }`}
            >
              <div>
                <p className="menu-footer pt-3">
                  <Link
                    to="/contact"
                    className="text-secondary link hover-color-yellow "
                  >
                    Contact Us
                  </Link>
                </p>
                <p className="menu-footer">
                  <Link
                    to="/faq"
                    className="text-secondary link hover-color-yellow"
                  >
                    FAQs
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="raw">
        <hr />
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
