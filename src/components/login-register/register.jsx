import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import axiosInstance from "../../apis/config";
import axios from "axios";

import styles from "./login-register.module.css";

const Register = ({ onRegistrationSuccess }) => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = (user, { resetForm }) => {
    axiosInstance
      .post("/register", user)
      .then((response) => {
        // handle response data, e.g. show success message
        setIsSubmitted(true);
        resetForm();
        setTimeout(() => {
          onRegistrationSuccess();
        }, 2000);
      })
      .catch((error) => {
        // handle error, e.g. show error message
        setErrorMessage(
          "Email already exists / Registration failed. Please try again."
        );
      });
  };

  const handleEmailVerification = async (email) => {
    try {
      const response = await axios.get(
        `https://api.zerobounce.net/v2/validate?api_key=1223a74fb03544f2887fa5d8428f84d3&email=${email}`
      );
      if (response.data.status === "valid") {
        // email address is valid, proceed with registration
        handleSubmit(user);
      } else {
        // email address is invalid, show error message
        setErrorMessage(
          "Invalid email address. Please enter a valid email address."
        );
      }
    } catch (error) {
      // handle error, e.g. show error message
      setErrorMessage("Email verification failed. Please try again later.");
    }
  };

  return (
    <>
      {errorMessage && !isSubmitted ? (
        <div className="alert alert-danger">{errorMessage}</div>
      ) : isSubmitted ? (
        <div className="alert alert-success">
          Register submitted successfully!
        </div>
      ) : null}

      <Formik
        initialValues={{
          ...user,
        }}
        validationSchema={Yup.object({
          fullName: Yup.string()
            .required("Full name is required")
            .min(3, "Full name must be at least 3 characters")
            .max(50, "Full name must be less than 50 characters"),
          email: Yup.string()
            .required("Email is required")
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Invalid email address"),
          password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters long")
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol from (@$!%*?&) ."
            ),
          confirmPassword: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref("password")], "Password do not match")
            .label("Confirm Password"),
        })}
        onSubmit={handleEmailVerification}
      >
        {({ errors, touched }) => (
          <Form className={styles.label}>
            <div className="mb-3">
              <label className="mb-1" htmlFor="fullName">
                Full Name <span>*</span>
              </label>
              <Field
                className={`form-control ${styles.input}`}
                name="fullName"
                type="text"
                id="fullName"
                placeholder="Please enter your fullName"
              />
              {errors.fullName && touched.fullName ? (
                <span className="text-danger ms-2">{errors.fullName}</span>
              ) : null}
            </div>
            <div className="mb-3">
              <label className="mb-1" htmlFor="email">
                Email <span>*</span>
              </label>
              <Field
                className={`form-control ${styles.input}`}
                name="email"
                type="email"
                id="email"
                placeholder="Please enter a valid email address"
              />
              {errors.email && touched.email ? (
                <span className="text-danger ms-2">{errors.email}</span>
              ) : null}
            </div>
            <div className="mb-3">
              <label className="mb-1" htmlFor="password">
                Password <span>*</span>
              </label>
              <div className={styles.passwordInputWrapper}>
                <Field
                  className={`form-control ${styles.input}`}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Please enter s strong password"
                />
                <span
                  className={styles.togglePasswordVisibilityButton}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </span>
              </div>
              {errors.password && touched.password ? (
                <span className="text-danger ms-2">{errors.password}</span>
              ) : null}
            </div>

            <div className="mb-3">
              <label className="mb-1" htmlFor="confirmPassword">
                Confirm Password <span>*</span>
              </label>
              <Field
                className={`form-control ${styles.input}`}
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                placeholder="Please confirm your password"
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <span className="text-danger ms-2">
                  {errors.confirmPassword}
                </span>
              ) : null}
            </div>
            <div
              className={`${styles["group-button"]} ${styles["button-submit"]}`}
            >
              <input
                type="submit"
                className={`btn-bg-dark ${styles.button}`}
                value="Create New Account"
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;
