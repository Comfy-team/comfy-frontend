import { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "emailjs-com";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faEnvelope,
} from "@fortawesome/free-regular-svg-icons";
import { faHeadphones, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
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

  const sendEmail = (values, { resetForm, setSubmitting }) => {
    // Set the template parameters to include the email address
    const templateParams = {
      from_email: values.email, // Use the user-entered email address as the "from" address
      from_name: values.name,
      message: values.message,
    };

    // Send email using EmailJS API
    emailjs
      .send(
        "service_e1wev9l",
        "template_wh85pl4",
        templateParams,
        "TsoWOt-ZQTaLMUt3q"
      )
      .then((result) => {
        console.log(result.text);
        setIsMessageSent(true);
        setTimeout(() => setIsMessageSent(false), 3000);
      })
      .catch((error) => {
        console.log(error.text);
        setIsMessageSent(false);
      });

    // Reset the form
    resetForm();

    setSubmitting(false);
  };

  const [isMessageSent, setIsMessageSent] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={sendEmail}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form ref={formRef}>
          <div className="mb-3 pt-3">
            <Field
              type="text"
              name="name"
              className={`form-control bg-light rounded-0 border-0 ${
                touched.name && errors.name ? "is-invalid" : ""
              }`}
              placeholder="Name"
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
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
          {isMessageSent && (
            <div className="alert alert-success mt-3">
              Thanks for contacting us. We'll get back to you as soon as
              possible.
            </div>
          )}
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
                  <p>2168 S Archer Ave, Chicago, IL 60616, US</p>
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="col-2 contact-info-icon">
                  <FontAwesomeIcon icon={faHeadphones} className=" fa-2x" />
                </div>
                <div className="col-9 contact-info">
                  <h5 className="d-block">Phone</h5>
                  <p>+1 312-791-9121 | +1 233-688-8999</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-2 contact-info-icon">
                  <FontAwesomeIcon icon={faEnvelope} className=" fa-2x" />
                </div>
                <div className="col-9 contact-info">
                  <h5 className="d-block">Email</h5>
                  <p>contact@company.com</p>
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
