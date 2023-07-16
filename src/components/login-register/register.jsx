import { useState } from "react";
import { useDispatch } from "react-redux";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// component
import axiosInstance from "../../apis/config";
import { showToast } from "../../store/slices/toastSlice";

// style
import styles from "./login-register.module.css";

const Register = ({ onRegistrationSuccess }) => {
  
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = (user, { resetForm }) => {
    axiosInstance
      .post("/register", user)
      .then((response) => {
        // handle response data, e.g. show success message
        dispatch(showToast("Register submitted successfully!"));
        resetForm();
        setTimeout(() => {
          onRegistrationSuccess();
        }, 2000);
      })
      .catch((error) => {
        // handle error, e.g. show error message
        dispatch(showToast("Email already exists / Registration failed. Please try again."));
      });
  };
  return (
    <>
      <Formik
        initialValues={{
          ...user,
        }}
        validationSchema={Yup.object({
          fullName: Yup.string()
            .required("Full name is required")
            .matches(/^[a-zA-Z ]+$/,"Full name shouldn't have numbers")
            .min(3, "Full name must be at least 3 characters")
            .max(50, "Full name must be less than 50 characters"),
          email: Yup.string()
            .required("Email is required")
            .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i, "Email must be a valid email address")
            .test("email-username-length", "Sorry, email username must be between 6 and 30 characters long", function(value) {
              const username = value.split("@")[0];
              return username.split("@")[0].length >= 6 && username.length <= 30;
            })
            .test("lowercase", "Email must be lowercase", function(value) {
              return value.toLowerCase() === value;
            }),
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
        onSubmit={handleSubmit}
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
