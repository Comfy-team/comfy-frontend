import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
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
    updateStates();
    window.addEventListener("resize", updateStates);
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
    <footer className=" ">
      <div className="container ">
        <div className="row footer-top pb-4">
          <div className="col-lg-5 col-md-6 col-sm-12 mb-4">
            <img src={logo1} alt="" style={{ width: "9rem" }} />
            <p className="pt-4 footer-color">
              Since 2013 we’ve been creating industrial design, residential
              architecture, commercial interiors. Chase mice attack feet but rub
              face on everything cepteur sint occaecat cupidatat proident.
            </p>
            <h6
              className="text-light footer-toggle d-sm-none d-flex "
              onClick={toggleFollowUs}
            >
              Follow Us{" "}
              <FontAwesomeIcon
                icon={faAngleDown}
                className={`icon ${showFollowUs ? "icon-rotate" : ""} hover-color-yellow`}
              />
            </h6>{" "}
            <div className={`footer-content ${showFollowUs ? "show" : ""}`}>
              <h6 className="text-light d-none d-sm-block ">Follow Us</h6>
              <div className="social-icons">
                <Link
                  to="https://instagram.com/comfy_store4?igshid=MzNlNGNkZWQ4Mg=="
                  className="me-4 link-light  hover-color-yellow"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="lg"
                    className="pt-2 hover-color-yellow"
                  />
                </Link>
                <Link to="/" className="me-4 link-light">
                  <FontAwesomeIcon
                    icon={faFacebookF}
                    size="lg"
                    className="hover-color-yellow"
                  />
                </Link>
                <Link to="/" className="me-4 link-light">
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    size="lg"
                    className="hover-color-yellow"
                  />
                </Link>
                <Link to="/" className="me-4 link-light">
                  <FontAwesomeIcon
                    icon={faGithub}
                    size="lg"
                    className="hover-color-yellow"
                  />
                </Link>
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
                className={`icon ${showHereToHelp ? "icon-rotate" : ""} hover-color-yellow`}
              />
            </h6>
            <h6 className="text-light d-none d-sm-block">HERE TO HELP</h6>

            <div className={`footer-content ${showHereToHelp ? "show" : ""}`}>
              <div>
                <p className="pt-3 footer-color">
                  Have a question? You may find an answer in our FAQs. But you
                  can also contact us:
                </p>
              </div>
              <div>
                <p>
                  <Link to="tel:+201003533427">
                    <FontAwesomeIcon
                      icon={faPhoneVolume}
                      className="text-light  pt-4 pb-2 d-block hover-color-yellow"
                      size="lg"
                    />
                  </Link>
                  <span className="text-light d-block">Order by phone</span>

                  <span className="d-block footer-color">
                    Available everyday
                  </span>

                  <span className="contacts">
                    <Link
                      to="tel:+201003533427"
                      className=" hover-color-yellow footer-color"
                    >
                      (+20) 1003533427
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

                  <span className="d-block footer-color">
                    Get in touch by email
                  </span>

                  <span className="contacts">
                    <Link
                      to="mailto:comfyproject20@gmail.com"
                      className=" hover-color-yellow footer-color"
                    >
                      comfyproject20@gmail.com
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
                className={`icon ${showCustomerService ? "icon-rotate" : ""} hover-color-yellow`}
              />
            </h6>
            <h6 className="text-light d-none d-sm-block ">Customer Service</h6>

            <div
              className={`footer-content ${showCustomerService ? "show" : ""}`}
            >
              <div>
                <p className="menu-footer pt-3">
                  <Link
                    to="/contact"
                    className="footer-color link hover-color-yellow "
                  >
                    Contact Us
                  </Link>
                </p>
                <p className="menu-footer">
                  <Link
                    to="/faq"
                    className="footer-color link hover-color-yellow"
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
        <hr className="footer-color" />
        <div className="col-12 col-sm pt-2 pb-3 d-flex justify-content-start justify-content-sm-center text-center footer-color">
          <h6>
            © Copyright 2023 Comfy Store. All Rights Reserved. Design By
            Team3-ITI
          </h6>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
