import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { cities } from "../../apis/cities";
import { governoratesData } from "../../apis/governorates";
import style from "./checkout.module.css";
import "../../App.css";
import jwtDecode from "jwt-decode";
import axiosInstance from "./../../apis/config";

const DisplayingErrorMessagesSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  lastName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  phone: Yup.string()
    .required("Required")
    .matches(
      /^(\+2)?01[0-2]{1}[0-9]{8}$/,
      "Invalid phone number. Must be an Egyptian phone number"
    ),
  address: Yup.object({
    city: Yup.string().label("City"),
    street: Yup.string().label("Street").required("Required"),
    building: Yup.number().required("Required").integer().label("Building"),
    governorate: Yup.string().label("Governorate").required("Required"),
    apartment: Yup.string().label("Apartment").required("Required"),
    postalCode: Yup.number()
      .required("Required")
      .integer("enter only number please")
      .nullable()
      .label("Postal Code"),
    country: Yup.string().required("Required"),
  }),
});
export default function FormComonent({ onFormSubmit, history, userinfo }) {
  const [saveInfo, setSaveInfo] = useState(Boolean(true.toString()));
  const [formData, setFormData] = useState("");
  const [user, setUser] = useState("");
  const token = localStorage.getItem("userToken");
  const decoded = jwtDecode(token);
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
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {}, [formData]);
  // console.log("formData   ", formData);

  const initialValues = {
    firstName: "",
    lastName: "",
    phone: "",
    address: {
      postalCode: user?.address?.postalCode ?? "",
      apartment: user?.address?.apartment ?? "",
      street: user?.address?.street ?? "",
      building: user?.address?.building ?? "",
      city: user?.address?.city ?? "",
      governorate: user?.address?.governorate ?? "",
      country: "",
    },
  };

  const formSubmit = submitdata => {
    // console.log(submitdata);
    setFormData(submitdata);
    onFormSubmit(submitdata);
    // if (saveInfo) {
    //   localStorage.setItem("userInfo", JSON.stringify(submitdata));
    // }
    let theSendData = {
      id: decoded.id,
      fullName: submitdata.firstName + submitdata.lastName,
      password: submitdata.password,
      email: submitdata.email,
      phone: submitdata.phone,
      city: submitdata.address.city,
      street: submitdata.address.street,
      building: submitdata.address.building,
      governorate: submitdata.address.governorate,
      apartment: submitdata.address.apartment,
      postalCode: submitdata.address.postalCode,
    };
    // console.log(theSendData);
    if (saveInfo) {
      axiosInstance
        .patch("/users", theSendData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        })
        .then(res => {
          // console.log(res);
        })
        .catch(err => console.log(err));
    }
  };

  // console.log("formData   ", formData);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={DisplayingErrorMessagesSchema}
        // onSubmit={values => {
        //   console.log(values);
        // }}
        onSubmit={formSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <h6> Contact </h6>
            <div className="form-group">
              <Field
                name="phone"
                placeholder="phone"
                className="form-control"
                type="text"
                id="phone"
              />
              {touched.phone && errors.phone && (
                <div className="text-danger ms-2">{errors.phone}</div>
              )}
            </div>

            <h6 className={`{} mb-0 mt-4 `}> Shipping address </h6>
            <div className="row">
              <div className="form-group col-6">
                <Field
                  name="firstName"
                  placeholder="firstName"
                  className="form-control"
                  type="text"
                  id="firstName"
                />
                {touched.firstName && errors.firstName && (
                  <div className="text-danger ms-2">{errors.firstName}</div>
                )}
              </div>
              <div className="form-group col-6 m-0">
                <Field
                  name="lastName"
                  placeholder="lastName"
                  className="form-control"
                  type="text"
                  id="lastName"
                />
                {touched.lastName && errors.lastName && (
                  <div className="text-danger ms-2">{errors.lastName}</div>
                )}
              </div>
            </div>

            <div className="form-group">
              <Field
                name="address.apartment"
                placeholder="apartment"
                className="form-control"
                type="text"
                id="apartment"
              />
              {touched.address?.apartment && errors.address?.apartment && (
                <div className="text-danger ms-2">
                  {errors.address?.apartment}
                </div>
              )}
            </div>

            <div className={`${style.formGroup} form-group`}>
              <Field
                name="address.building"
                placeholder="building"
                className="form-control"
                type="text"
                id="building"
              />
              {touched.address?.building && errors.address?.building && (
                <div className="text-danger ms-2">
                  {errors.address?.building}
                </div>
              )}
            </div>
            <div className={`${style.formGroup} form-group`}>
              <Field
                name="address.street"
                placeholder="street"
                className="form-control"
                type="text"
                id="street"
              />
              {touched.address?.building && errors.address?.street && (
                <div className="text-danger ms-2">
                  {errors.address?.building}
                </div>
              )}
            </div>

            <div className={`${style.formGroup} form-group`}>
              <Field
                className={`form-control ${style.input}`}
                name="address.country"
                id="country"
                as="select"
                type="text"
              >
                <option value="" id="0">
                  select a country
                </option>
                <option value="Egypt">Egypt </option>

                {touched.country && errors.country ? (
                  <small className="text-danger">{errors.country}</small>
                ) : null}
              </Field>
            </div>

            <div className="row mb-3 mt-0">
              <div className="form-group col-4 ">
                <Field
                  name="address.postalCode"
                  placeholder="postalCode"
                  className="form-control"
                  type="text"
                  id="aparpostalCodetment"
                />
                {touched.address?.postalCode && errors.address?.postalCode && (
                  <div className="text-danger ms-2">
                    {errors.address?.postalCode}
                  </div>
                )}
              </div>

              <div className="form-group col-4 ">
                <Field
                  className={`form-control ${style.input}`}
                  name="address.governorate"
                  id="governorate"
                  as="select"
                  type="text"
                >
                  <option value="" id="0">
                    select a governorate
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
                </Field>
                {touched.address?.governorate &&
                  errors.address?.governorate && (
                    <div className="text-danger ms-2">
                      {errors.address?.governorate}
                    </div>
                  )}
              </div>
              {/**=========city===========*/}

              <div className="form-group col-4 ">
                <Field
                  className={`form-control ${style.input}`}
                  name="address.city"
                  type="text"
                  id="city"
                  as="select"
                >
                  <option value="" id="0">
                    Select a city
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
                    return null;
                  })}
                </Field>
                {errors.address?.city && touched.address.city ? (
                  <span className="text-danger ms-2">
                    {errors.address.city}
                  </span>
                ) : null}
              </div>
              {/*====================*/}
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                // id="exampleCheck1"
                checked={saveInfo}
                onChange={e => setSaveInfo(e.target.checked)}
              />

              <label
                className={`${style.checklabal} form-check-label`}
                htmlFor="exampleCheck1"
              >
                save this information for next time{" "}
              </label>
            </div>
            <button type="submit" className="btn btn-dark mb-3">
              {" "}
              Continue to Shipping
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
