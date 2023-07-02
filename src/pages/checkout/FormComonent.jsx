import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";
import axiosInstance from "./../../apis/config";
import { cities } from "../../apis/cities";
import { governoratesData } from "../../apis/governorates";
import { saveFormData } from "../../store/slices/formSlice";

//style
import "../../App.css";
import style from "./checkout.module.css";
import Spinner from "./../../components/common/spinner";
//yup validation
const DisplayingErrorMessagesSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .matches(/^[a-zA-Z]+$/, "First name must contain only letters")
    .required("Required"),
  lastName: Yup.string()
    .matches(/^[a-zA-Z]+$/, "lastName must contain only letters")
    .max(20, "Must be 20 characters or less")
    .required("Required"),
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
      .label("Postal Code")
      .length(5)
      .matches(/^[0-9]{5}/),

    country: Yup.string(),
  }),
});
export default function FormComonent() {
  const [saveInfo, setSaveInfo] = useState(true);
  const [user, setUser] = useState("");
  const token = localStorage.getItem("userToken");
  const decoded = jwtDecode(token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //intial value
  const [theintialvalue, settheIntialvalue] = useState({
    firstName: "",
    lastName: "",
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
        settheIntialvalue(res.data);
        const theData = res.data;

        const [firstName, lastName] = theData.fullName.split(" ");
        settheIntialvalue({
          ...theData,
          firstName,
          lastName,
        });
      })
      .catch(err => console.log(err));
  }, [decoded.id, token]);

  const formSubmit = submitdata => {
    navigate(`/checkout/shipping`);
    dispatch(saveFormData(submitdata));

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

  if (!user) {
    return (
      <div>
        {" "}
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
                  placeholder="first name"
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
                  placeholder="last name"
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
                placeholder="Apartment"
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
                placeholder="Building"
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
                placeholder="Street"
                className="form-control"
                type="text"
                id="street"
              />
              {touched.address?.street && errors.address?.street && (
                <div className="text-danger ms-2">{errors.address?.street}</div>
              )}
            </div>

            <div className={`${style.formGroup} ${style.gray} form-group`}>
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

              {touched.address?.country && errors.address?.country && (
                <div className="text-danger ms-2">
                  {errors.address?.country}
                </div>
              )}
            </div>
            <div className="row mb-3 mt-0">
              <div className="form-group col-4 ">
                <Field
                  name="address.postalCode"
                  placeholder="postal Code"
                  className="form-control"
                  type="text"
                  id="postalCode"
                />
                {touched.address?.postalCode && errors.address?.postalCode && (
                  <div className="text-danger ms-2">
                    {errors.address?.postalCode}
                  </div>
                )}
              </div>

              <div className="form-group col-4 ">
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
                {errors.address?.city && touched.address?.city ? (
                  <span className="text-danger ms-2">
                    {errors.address?.city}
                  </span>
                ) : null}
              </div>

              {/*====================*/}
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                checked={saveInfo}
                onChange={e => setSaveInfo(e.target.checked)}
              />

              <label
                className={`${style.checklabal} form-check-label mb-4`}
                htmlFor="exampleCheck1"
              >
                save this information for next time{" "}
              </label>
            </div>

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
