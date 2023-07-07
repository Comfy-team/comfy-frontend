import { useState, useRef } from "react";

import emailjs from "emailjs-com";

//font awsome 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faHeadphones,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

//formik
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

//style
import style from "../../pages/contact/contact.module.css";

const ContactForm = () => {
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const formRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);

  const sendEmail = async (values, { resetForm }) => {
    // Set the template parameters to include the email address
    const templateParams = {
      from_email: values.email, // Use the user-entered email address as the "from" address
      from_name: values.name,
      message: values.message,
    };

    setIsSubmitting(true);

    try {
      // Send email using EmailJS API
      await emailjs.send(
        "service_e1wev9l",
        "template_wh85pl4",
        templateParams,
        "TsoWOt-ZQTaLMUt3q"
      );
      setIsMessageSent(true);
    } catch (error) {
      console.log(error.text);
    }

    setIsSubmitting(false);

    // Reset the form
    resetForm();
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    setIsMessageSent(false); // Reset the isMessageSent state to false when the form is submitted again
    await sendEmail(values, { resetForm });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit} // Use the handleFormSubmit function instead of sendEmail
    >
      {({ errors, touched }) => (
        <Form ref={formRef}>
          {isMessageSent && (
            <div className="alert alert-success mt-3">
              Thanks for contacting us. We'll get back to you as soon as
              possible.
            </div>
          )}
          <div className="mb-3 pt-3">
            <Field
              type="text"
              name="name"
              className={`form-control bg-light rounded-0 border-0 ${
                touched.name && errors.name ? "is-invalid" : ""
              }`}
              placeholder="Name"
              autoComplete="off"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="invalid-feedback"
            />
          </div>
          <div className="mb-3">
            <Field
              type="email"
              name="email"
              className={`form-control bg-light rounded-0 border-0 ${
                touched.email && errors.email ? "is-invalid" : ""
              }`}
              placeholder="Email"
              autoComplete="off"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="invalid-feedback"
            />
          </div>
          <div className="mb-3">
            <Field
              as="textarea"
              name="message"
              className={`form-control bg-light rounded-0 border-0 ${
                touched.message && errors.message ? "is-invalid" : ""
              }`}
              rows="4"
              placeholder="Message"
              autoComplete="off"
            />
            <ErrorMessage
              name="message"
              component="div"
              className="invalid-feedback"
            />
          </div>
          <div className="d-grid gap-2 ">
            <button
              type="submit"
              className="btn btn-dark p-2 submit-btn rounded-0 border-0 hover-bg-yellow"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const ContactInfo = () => {
  return (
    <div className=" container-fluid container-lg pt-4 ">
      <div className="row">
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
              <div className="row">
                <div className="col-2 contact-info-icon">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="fa-2x " />
                </div>
                <div className="col-9 contact-info ">
                  <h5 className="d-block">Address</h5>
                  <p> Cairo Festival City, New Cairo, Egypt </p>
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="col-2 contact-info-icon">
                  <FontAwesomeIcon icon={faHeadphones} className=" fa-2x" />
                </div>
                <div className="col-10 contact-info">
                  <h5 className="d-block">Phone</h5>
                  <p>+20 1003533427</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-2 contact-info-icon">
                  <FontAwesomeIcon icon={faEnvelope} className=" fa-2x" />
                </div>
                <div className="col-10 contact-info">
                  <h5 className="d-block">Email</h5>
                  <p>comfyproject20@gmail.com</p>
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="col-2 contact-info-icon">
                  <FontAwesomeIcon icon={faClock} className=" fa-2x" />
                </div>
                <div className="col-9 contact-info">
                  <h5 className="d-block">Opening Hours</h5>
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
