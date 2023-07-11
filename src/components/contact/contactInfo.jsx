//font awsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faHeadphones,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

//components
import ContactForm from "./contactForm";

//style
import style from "../../pages/contact/contact.module.css";

const ContactInfo = () => {
  return (
    <div className=" container-fluid container-lg pt-4 ">
      <div className="row mx-0">
        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 contact-form">
          <h2 className={`${style["contact-info-title"]} py-3`}>
            Get In Touch
          </h2>
          <ContactForm />
        </div>

        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 px-4">
          <div className="contact-info-container py-5 py-md-0">
            <h2 className={`${style["contact-info-title"]} py-3`}>
              Contact Info
            </h2>
            <div className="pt-3">
              <div className="row mx-0">
                <div className="col-md-3 col-lg-2 contact-info-icon">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="fa-2x pe-2 pb-2" />
                </div>
                <div className="col-md-9 col-lg-10 contact-info ">
                  <h3 className="d-block fs-5 ">Address</h3>
                  <p> Cairo Festival City, New Cairo, Egypt </p>
                </div>
              </div>
              <hr />

              <div className="row mx-0">
                <div className="col-sm-2 col-md-3 col-lg-2 contact-info-icon">
                  <FontAwesomeIcon icon={faHeadphones} className="fa-2x pe-2 pb-2" />
                </div>
                <div className="col-md-9 col-lg-10 contact-info">
                  <h3 className="d-block fs-5">Phone</h3>
                  <p>+20 1003533427</p>
                </div>
              </div>
              <hr />
              <div className="row mx-0">
                <div className="col-md-3 col-lg-2 contact-info-icon">
                  <FontAwesomeIcon icon={faEnvelope} className="fa-2x pe-2 pb-2" />
                </div>
                <div className="col-md-9 col-lg-10 contact-info">
                  <h3 className="d-block fs-5">Email</h3>
                  <p>comfyproject20@gmail.com</p>
                </div>
              </div>
              <hr />

              <div className="row mx-0">
                <div className="col-md-3 col-lg-2 contact-info-icon">
                  <FontAwesomeIcon icon={faClock} className="fa-2x pe-2 pb-2" />
                </div>
                <div className="col-md-9 col-lg-10 contact-info">
                  <h3 className="d-block fs-5">Opening Hours</h3>
                  <p>Sun-Sat: 8.00am - 9.00.pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
