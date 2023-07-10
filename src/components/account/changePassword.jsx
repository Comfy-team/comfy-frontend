import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

//component
import axiosInstance from "../../apis/config";
import { showToast } from "../../store/slices/toastSlice";

//style
import styles from "../../pages/account/account.module.css";


const ChangePasswords = ({ user, token}) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [showBtnSpinner, SetShowBtnSpinner] = useState(false);
    const [updateUser, setUpdateUser] = useState({
      id:id,
      password: "",
      currentPassword: "",
      confirmPassword: "",
    });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const togglePasswordVisibility = (passwordField) => {
    if (passwordField === "currentPassword") {
      setShowCurrentPassword((prevState) => !prevState);
    } else {
      setShowNewPassword((prevState) => !prevState);
    }
  };

  const updateUserSubmit = (updateUser, { resetForm }) => {
    SetShowBtnSpinner(true);
    axiosInstance
      .patch(`/users`, updateUser,
       {
        params:{
          id:id
        },
        headers: {
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json",
            "x-access-token":token
        },
      })
      .then((res) => {
        dispatch(showToast("Change Password successfully!"));
        SetShowBtnSpinner(false);
        resetForm()
      })
      .catch((err) => {
        // handle error, e.g. show error message
        dispatch(showToast("Unable to update / check your current Password again and make sure that new password is different from the current."));
        SetShowBtnSpinner(false);
      });
  };
  return (
    <div>
      <h2 className={`${styles["text-2xl"]} ${styles.subTitle}`}>
        Update your password
      </h2>

      <Formik
        initialValues={{
          ...updateUser,
        }}
        validationSchema={Yup.object({
            currentPassword: Yup.string().required(
              "Current Password is required"
            ).label("Current Password"),
          password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters long")
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol from (@$!%*?&)."
            ),
          confirmPassword: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref("password")], "Password doesn't match")
            .label("Confirm Password"),
        })}
        onSubmit={updateUserSubmit}
      >
        {({ errors, touched }) => (
          <Form className={styles.label}>
            <div className={`mb-4 ${styles["max-w-xl"]}`}>
              <label className="mb-1" htmlFor="currentPassword">
                Current Password
              </label>
              <div className={styles.passwordInputWrapper}>
                <Field
                  className={`form-control ${styles.input}`}
                  name="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  id="currentPassword"
                  placeholder="Please enter your current password"
                />
                <span
                  className={styles.togglePasswordVisibilityButton}
                  onClick={() => togglePasswordVisibility("currentPassword")}
                >
                  {showCurrentPassword ? (
                    <FontAwesomeIcon icon={faEye} />
                    ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  )}
                </span>
              </div>
              {errors.currentPassword && touched.currentPassword ? (
                <span className="text-danger ms-2">{errors.currentPassword}</span>
              ) : null}
            </div>
            <div className={`mb-4 ${styles["max-w-xl"]}`}>
              <label className="mb-1" htmlFor="password">
                New password
              </label>
              <div className={styles.passwordInputWrapper}>
                <Field
                  className={`form-control ${styles.input}`}
                  name="password"
                  type={showNewPassword ? "text" : "password"}
                  id="password"
                  placeholder="Please enter new password"
                />
                <span
                  className={styles.togglePasswordVisibilityButton}
                  onClick={() => togglePasswordVisibility("password")}
                >
                  {showNewPassword ? (
                    <FontAwesomeIcon icon={faEye} />
                    ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  )}
                </span>
              </div>
              {errors.password && touched.password ? (
                <span className="text-danger ms-2">{errors.password}</span>
              ) : null}
            </div>

            <div className={`mb-4 ${styles["max-w-xl"]}`}>
              <label className="mb-1" htmlFor="confirmPassword">
                Confirm Password
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

            <div className={`pt-3`}>
            {!showBtnSpinner ? 
              <input
                type="submit"
                className={`btn-bg-dark text-center ${styles.button}`}
                value="Update password"
              />
              : 
              <button
              type="button"
              className={`btn-bg-dark text-center ${styles.button}`}
            >
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </button>
             
              }
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePasswords;
