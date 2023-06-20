import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../apis/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styles from "./login-register.module.css";
import { getCart } from "./../../functions/cart";

const Login = ({ closeModal, saveUserData }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleSubmit = (user, { resetForm }) => {
    axiosInstance
      .post("/login", user)
      .then((response) => {
        // handle response data, e.g. show success message
        setIsSubmitted(true);
        // store token in local storage
        localStorage.setItem("userToken", response.data.token);
        // save User Data
        getCart(response.data.token);
        saveUserData();
        resetForm();
        closeModal();
      })
      .catch((error) => {
        // handle error, e.g. show error message
        setErrorMessage("Email or Password not correct. Please try again.");
      });
  };
  return (
    <>
      {errorMessage && !isSubmitted ? (
        <div className="alert alert-danger">{errorMessage}</div>
      ) : isSubmitted ? (
        <div className="alert alert-success">Login successfully!</div>
      ) : null}
      <Formik
        initialValues={{ ...user }}
        validationSchema={Yup.object({
          email: Yup.string()
            .required("Email is required")
            .email("Invalid email address"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={styles.label}>
            <div className="mb-3">
              <label className="mb-1" htmlFor="email">
                Email <span>*</span>
              </label>
              <Field
                className={`form-control ${styles.input}`}
                name="email"
                type="email"
                placeholder="Please enter your email address"
              />
              {errors.email && touched.email ? (
                <span className="text-danger ms-2"> {errors.email}</span>
              ) : null}
            </div>
            <div className="mb-3">
              <label className="mb-1" htmlFor="password">
                Password <span>*</span>
              </label>

              {/* <Field className={`form-control ${styles.input}`} name="password" type="password" placeholder="Please enter your password"/> */}
              <div className={styles.passwordInputWrapper}>
                <Field
                  className={`form-control ${styles.input}`}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Please enter a strong password"
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
            <div
              className={`${styles["group-button"]} ${styles["button-submit"]}`}
            >
              <input
                type="submit"
                className={`btn-bg-dark ${styles.button}`}
                value="Login"
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
