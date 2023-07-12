import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";

import axiosInstance from "../../apis/config";
import { cities } from "../../apis/cities";
import { governoratesData } from "../../apis/governorates";

//componant
import Spinner from "../common/spinner";
//style
import style from "../../pages/checkout/checkout.module.css";

// validation
const DisplayingErrorMessagesSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full name is required")
    .matches(/^[a-zA-Z ]+$/, "Full name shouldn't have numbers")
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name must be less than 50 characters"),
  phone: Yup.string()
    .required("Required")
    .matches(
      /^(\+2)?01[0-2]{1}[0-9]{8}$/,
      "Invalid phone number. Must be an Egyptian phone number"
    ),
  address: Yup.object({
    city: Yup.string().required("Required").label("City"),
    street: Yup.string().label("Street").required("Required"),
    building: Yup.number()
      .typeError("Building must be a number")
      .required("Required")
      .min(1, "Building  can't be 0")
      .label("Building"),
    governorate: Yup.string().label("Governorate").required("Required"),
    apartment: Yup.string().label("Apartment").required("Required"),
    postalCode: Yup.string()
      .required("Required")
      .typeError("postalCode must be a number")
      .label("Postal Code")
      .length(5, "Postal code must be exactly 5 digits")
      .matches(/(?!0)[0-9]{5}/, "Postal code must not start with zero"),
    country: Yup.string(),
  }),
});

export default function FormComonent() {
  const [saveInfo, setSaveInfo] = useState(true);
  const [user, setUser] = useState("");

  const navigate = useNavigate();
  const cart = useSelector(state => state.cart.cart);

  const token = localStorage.getItem("userToken");
  const decoded = jwtDecode(token);

  const savedFormData = localStorage.getItem("localFormData");
  //intial value
  const [theintialvalue, settheIntialvalue] = useState(() => {
    // retrieve form data from localStorage if it exists
    if (savedFormData) {
      return JSON.parse(savedFormData);
    } else {
      return {
        fullName: user.fullName || "",
        phone: user?.phone || "",
        address: {
          postalCode: user?.address?.postalCode || "",
          apartment: user?.address?.apartment || "",
          street: user?.address?.street || "",
          building: user?.address?.building || "",
          city: user?.address?.city || "",
          governorate: user?.address?.governorate || "",
          country: "Egypt",
        },
      };
    }
  });

  useEffect(() => {
    axiosInstance
      .get(`/users/${decoded.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-access-token": token,
        },
      })
      .then(res => {
        setUser(res.data);
        if (savedFormData) {
          settheIntialvalue(JSON.parse(savedFormData));
        } else {
          settheIntialvalue(res.data);
        }
      })
      .catch(err => console.log(err));
  }, [decoded.id, token]);

  const formSubmit = submitdata => {
    navigate(`/checkout/shipping`);

    //data send to database
    let theSendData = {
      id: decoded.id,
      phone: submitdata?.phone,
      address: {
        city: submitdata?.address?.city,
        street: submitdata?.address?.street,
        building: submitdata?.address?.building,
        governorate: submitdata?.address?.governorate,
        apartment: submitdata?.address?.apartment,
        postalCode: submitdata?.address?.postalCode,
      },
    };

    // save form data to localStorage
    localStorage.setItem("localFormData", JSON.stringify(submitdata));

    if (saveInfo) {
      axiosInstance
        .patch("/users", theSendData, {
          params: {
            id: decoded.id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        })
        .then(res => {})
        .catch(err => console.log(err));
    }
  };
  if (!user) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-4">
      <Formik
        initialValues={theintialvalue}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={formSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <h6> Contact </h6>
            <div className="form-group form-floating ">
              <Field
                name="phone"
                placeholder="phone"
                className="form-control"
                type="text"
                id="phone"
              />{" "}
              <label htmlFor="phone">phone </label>
              {touched.phone && errors.phone && (
                <div className="text-danger ms-2">{errors.phone}</div>
              )}
            </div>
            <h6 className={`mb-0 mt-4 `}> Shipping address </h6>

            <div className="form-group form-floating ">
              <Field
                name="fullName"
                placeholder="full name"
                className="form-control"
                type="text"
                id="fullName"
              />
              <label htmlFor="fullName">full Name </label>
              {touched.fullName && errors.fullName && (
                <div className="text-danger ms-2">{errors.fullName}</div>
              )}
            </div>

            <div className="form-group form-floating ">
              <Field
                name="address.apartment"
                placeholder="Apartment"
                className="form-control"
                type="text"
                id="apartment"
              />
              <label htmlFor="apartment">apartment </label>
              {touched.address?.apartment && errors.address?.apartment && (
                <div className="text-danger ms-2">
                  {errors.address?.apartment}
                </div>
              )}
            </div>

            <div className={`${style.formGroup} form-group form-floating `}>
              <Field
                name="address.building"
                placeholder="Building"
                className="form-control"
                type="text"
                id="building"
              />
              <label htmlFor="building">building </label>

              {touched.address?.building && errors.address?.building && (
                <div className="text-danger ms-2">
                  {errors.address?.building}
                </div>
              )}
            </div>

            <div className={`${style.formGroup}  form-floating   form-group`}>
              <Field
                name="address.street"
                placeholder="Street"
                className="form-control"
                type="text"
                id="street"
              />
              <label htmlFor="street">street </label>

              {touched.address?.street && errors.address?.street && (
                <div className="text-danger ms-2">{errors.address?.street}</div>
              )}
            </div>
            <div className="row mb-3 mt-0 ">
              <div
                className={`${style.formGroup} ${style.gray} form-group form-floating  col-lg-6  col-sm-12`}
              >
                <Field
                  className={`form-control ${style.gray}  ${style.input}`}
                  name="address.country"
                  id="country"
                  as="select"
                  type="text"
                >
                  <option value="" id="0" disabled className={`${style.gray} `}>
                    Country
                  </option>
                  <option value="Egypt">Egypt </option>
                </Field>
                <label htmlFor="country">Country</label>

                {touched.address?.country && errors.address?.country && (
                  <div className="text-danger ms-2">
                    {errors.address?.country}
                  </div>
                )}
              </div>

              <div className="form-group form-floating   col-lg-6 col-sm-12">
                <Field
                  className={`form-control ${style.input} ${style.gray} `}
                  name="address.governorate"
                  id="governorate"
                  as="select"
                  type="text"
                >
                  <option value="" id="0" disabled>
                    Governorate
                  </option>
                  {governoratesData.map(governorate => (
                    <option
                      key={governorate.id}
                      id={governorate.id}
                      value={governorate.governorate_name_en}
                    >
                      {governorate.governorate_name_en}
                    </option>
                  ))}
                </Field>{" "}
                <label htmlFor="postalCode">
                  {" "}
                  <label htmlFor="postalCode">Governorate</label>
                </label>
                {touched.address?.governorate &&
                  errors.address?.governorate && (
                    <div className="text-danger ms-2">
                      {errors.address?.governorate}
                    </div>
                  )}
              </div>
            </div>
            {/**=========city===========*/}
            <div className="row mb-3 mt-0  form-floating ">
              <div className="form-group form-floating  col-lg-6  col-sm-12">
                <Field
                  className={`form-control ${style.input} ${style.gray} `}
                  name="address.city"
                  type="text"
                  id="city"
                  as="select"
                >
                  <option value="" id="0" disabled>
                    City
                  </option>
                  {cities.map(city => {
                    const selectedGovernorateValue =
                      document.querySelector("#governorate")?.value;
                    const selectedGovernorateOption = document.querySelector(
                      `#governorate option[value="${selectedGovernorateValue}"]`
                    );
                    const selectedGovernorateId = selectedGovernorateOption
                      ? selectedGovernorateOption.id
                      : null;
                    if (city?.governorate_id === selectedGovernorateId) {
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
                    return null;
                  })}
                </Field>
                <label htmlFor="city">City</label>

                {errors.address?.city && touched.address?.city ? (
                  <span className="text-danger ms-2">
                    {errors.address?.city}
                  </span>
                ) : null}
                {/*====================*/}
              </div>
              <div className="form-group form-floating  col-lg-6  col-sm-12">
                <Field
                  name="address.postalCode"
                  placeholder="postal Code"
                  className="form-control"
                  type="text"
                  id="postalCode"
                />
                <label htmlFor="postalCode">Postal Code </label>
                {touched.address?.postalCode && errors.address?.postalCode && (
                  <div className="text-danger ms-2">
                    {errors.address?.postalCode}
                  </div>
                )}
              </div>
            </div>

            {/*====================*/}

            <div className="form-check my-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                checked={saveInfo}
                onChange={e => setSaveInfo(e.target.checked)}
              />

              <label
                className={`${style.checklabal} form-check-label mt-2`}
                htmlFor="exampleCheck1"
              >
                save this information for next time{" "}
              </label>
            </div>
            {/*====================*/}

            <div className="row mb-4  w-100 m-auto">
              <Link
                className={`col-lg-6  col-md-6 col-sm-12  col-12  mt-2 mb-3 mt-4 ${style.returnLink} text-decoration-none `}
                to="/cart"
              >
                {" "}
                {`<  `} return to Cart{" "}
              </Link>

              <button
                type="submit"
                disabled={cart?.totalPrice === 0}
                className={`${style.formbtn} 
                 col-lg-6  col-md-6 col-sm-12  col-12  btn  h-100  ws-100 me-0 `}
              >
                Continue to Shipping
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
