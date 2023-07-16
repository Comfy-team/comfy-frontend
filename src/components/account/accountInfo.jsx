import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

//component
import axiosInstance from "../../apis/config";
import { governoratesData } from "../../apis/governorates";
import { cities } from "../../apis/cities";
import { showToast } from "../../store/slices/toastSlice";

// style
import styles from "../../pages/account/account.module.css";

const AccountInfo = ({ user, token,setUser }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showBtnSpinner, SetShowBtnSpinner] = useState(false);
  const [updateUser, setUpdateUser] = useState({
    id: id,
    fullName: user?.fullName,
    email: user?.email,
    phone: user?.phone,
    address: {
      city: user?.address?.city,
      street: user?.address?.street,
      building: user?.address?.building,
      governorate: user?.address?.governorate,
      apartment: user?.address?.apartment,
      postalCode: user?.address?.postalCode,
    },
  });


  const updateUserSubmit = (updateUser) => {
    SetShowBtnSpinner(true);
    axiosInstance
      .patch("/users", updateUser, {
        params:{
          id:id
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
      .then((res) => {
        dispatch(showToast("Account Updated successfully!"));
        SetShowBtnSpinner(false);
        setUser(updateUser)
      })
      .catch((err) => {
        // handle error, e.g. show error message
        dispatch(showToast("Unable to update, please try again."));
        SetShowBtnSpinner(false);
      });
  };

  return (
    <div>
      <h2 className={`${styles["text-2xl"]} ${styles.subTitle}`}>
        Account Information
      </h2>
      <Formik
        initialValues={{
          ...updateUser,
        }}
        validationSchema={Yup.object({
          fullName: Yup.string()
            .required("Full name is required")
            .matches(/^[a-zA-Z ]+$/, "Full name shouldn't have numbers")
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
            
          phone: Yup.string()
            .optional()
            .nullable()
            .matches(
              /^(\+2)?01[0-2]{1}[0-9]{8}$/,
              "Please enter a valid Egyptian phone number."
            ),
          address: Yup.object({
            city: Yup.string().optional().nullable().label("City"),
            street: Yup.string().optional().nullable().label("Street"),
            building: Yup.number()
              .optional()
              .nullable()
              .min(1, "Building can't be 0")
              .integer("Building must be an integer number.")
              .label("Building"),
            governorate: Yup.string()
              .optional()
              .nullable()
              .label("Governorate"),
            apartment: Yup.string().optional().nullable().label("Apartment"),
            postalCode: Yup.string()
              .optional()
              .length(5, "Postal code must be exactly 5 digits")
              .matches(/(?!0)[0-9]{5}/, "Postal code must not start with zero")
              .label("Postal Code"),
          })
            .optional()
            .nullable()
            .label("Address"),
        })}
        onSubmit={updateUserSubmit}
      >
        {({ errors, touched }) => (
          <Form className={styles.label}>
            <div className={`mb-4 ${styles["max-w-xl"]}`}>
              <label className="mb-1" htmlFor="fullName">
                Full Name
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
            <div className={`mb-4 ${styles["max-w-xl"]}`}>
              <label className="mb-1" htmlFor="email">
                Email
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
            <div className={`mb-4 ${styles["max-w-xl"]}`}>
              <label className="mb-1" htmlFor="phone">
                Phone Number
              </label>
              <Field
                className={`form-control ${styles.input}`}
                name="phone"
                type="text"
                id="phone"
                placeholder="Please enter your phone number"
              />
              {errors?.phone && touched?.phone ? (
                <span className="text-danger ms-2">{errors.phone}</span>
              ) : null}
            </div>
            <div className={`mb-4 ${styles["max-w-xl"]}`}>
              <label className="mb-1" htmlFor="governorate">
                Governorate
              </label>
              <Field
                className={`form-control ${styles.input}`}
                name="address.governorate"
                type="text"
                id="governorate"
                as="select"
              >
                <option value="" id="0">
                  Select a governorate
                </option>
                {governoratesData.map((governorate) => (
                  <option
                    key={governorate.id}
                    id={governorate.id}
                    value={governorate.governorate_name_en}
                  >
                    {governorate.governorate_name_en}
                  </option>
                ))}
              </Field>
              {errors.address?.governorate && touched?.address?.governorate ? (
                <span className="text-danger ms-2">
                  {errors.address.governorate}
                </span>
              ) : null}
            </div>
            <div className={`mb-4 ${styles["max-w-xl"]}`}>
              <label className="mb-1" htmlFor="city">
                City
              </label>
              <Field
                className={`form-control ${styles.input}`}
                name="address.city"
                type="text"
                id="city"
                as="select"
              >
                <option value="">Select a city</option>
                {cities.map((city) => {
                  const selectedGovernorateValue =
                    document.querySelector("#governorate")?.value;
                  const selectedGovernorateOption = document.querySelector(
                    `#governorate option[value="${selectedGovernorateValue}"]`
                  );
                  const selectedGovernorateId = selectedGovernorateOption
                    ? selectedGovernorateOption.id
                    : null;
                  if (city.governorate_id === selectedGovernorateId) {
                    return (
                      <option
                        key={city.id}
                        id={city.id}
                        value={city.city_name_en}
                      >
                        {city.city_name_en}
                      </option>
                    );
                  }
                  return updateUser?.address.governorate;
                })}
              </Field>
              {errors.address?.city && touched?.address?.city ? (
                <span className="text-danger ms-2">{errors.address.city}</span>
              ) : null}
            </div>

            <div className={`mb-4 ${styles["max-w-xl"]}`}>
              <label className="mb-1" htmlFor="street">
                Street
              </label>
              <Field
                className={`form-control ${styles.input}`}
                name="address.street"
                type="text"
                id="street"
                placeholder="Please enter your street address"
              />
              {errors.address?.street && touched?.address?.street ? (
                <span className="text-danger ms-2">
                  {errors.address.street}
                </span>
              ) : null}
            </div>

            <div className={`mb-4 ${styles["max-w-xl"]}`}>
              <label className="mb-1" htmlFor="building">
                Building
              </label>
              <Field
                className={`form-control ${styles.input}`}
                name="address.building"
                type="number"
                id="building"
                placeholder="Please enter your building number"
              />
              {errors.address?.building && touched?.address?.building ? (
                <span className="text-danger ms-2">
                  {errors.address.building}
                </span>
              ) : null}
            </div>

            <div className={`mb-4 ${styles["max-w-xl"]}`}>
              <label className="mb-1" htmlFor="apartment">
                Apartment
              </label>
              <Field
                className={`form-control ${styles.input}`}
                name="address.apartment"
                type="text"
                id="apartment"
                placeholder="Please enter your apartment"
              />
              {errors.address?.apartment && touched?.address?.apartment ? (
                <span className="text-danger ms-2">
                  {errors.address.apartment}
                </span>
              ) : null}
            </div>

            <div className={`mb-4 ${styles["max-w-xl"]}`}>
              <label className="mb-1" htmlFor="postalCode">
                Postal Code
              </label>
              <Field
                className={`form-control ${styles.input}`}
                name="address.postalCode"
                type="text"
                id="postalCode"
                placeholder="Please enter your postal Code"
              />
              {errors.address?.postalCode && touched?.address?.postalCode ? (
                <span className="text-danger ms-2">
                  {errors.address.postalCode}
                </span>
              ) : null}
            </div>
            <div className={`pt-3`}>
            {!showBtnSpinner ? 
              <input
                type="submit"
                className={`btn-bg-dark text-center ${styles.button}`}
                value="Update account"
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

export default AccountInfo;
