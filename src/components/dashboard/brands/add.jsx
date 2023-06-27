import { useState } from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// component
import axiosInstance from "../../../apis/config";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// style
import dashStyle from "./../../../pages/dashboard/dashboard.module.css";
import style from "./brands.module.css";

const BrandsAdd = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const token = localStorage.getItem("userToken");

  const addBrandSubmit = (addBrand) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("image", image);

    // create a FormData object to send the form data and file
    axiosInstance
      .post("/brands", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          "x-access-token": token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setIsSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        // handle error, e.g. show error message
        setErrorMessage("Unable to add, please try again.");
      });
  };

  return (
    <div className="ps-4 ">
      <h1 className={`py-3 ${dashStyle["fw-bold"]}`}>Add New Brand</h1>
      {errorMessage && !isSubmitted ? (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {" "}
          <FontAwesomeIcon icon={faTimes} /> {errorMessage}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setErrorMessage(null)}
          ></button>
        </div>
      ) : isSubmitted ? (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          brand added successfully!
          <FontAwesomeIcon icon={faCheckCircle} className="ms-2" />
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setIsSubmitted(false)}
          ></button>
        </div>
      ) : null}

      <div>
        <Formik
          initialValues={{ name:name,category:category,image:image }}
          validationSchema={Yup.object({
            name: Yup.string().required("brand name is required"),
            category: Yup.string().required("Category is required"),
            image: Yup.mixed()
            .required("Image is required")
            .test("fileType", "Invalid image type", (value) =>
              value && value.type.startsWith("image/")
            ),
          })}
          onSubmit={addBrandSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className={style.label} encType="multipart/form-data">
              <div className={`mb-4 ${style["max-w-xl"]}`}>
                <label className="mb-1" htmlFor="name">
                  Name
                </label>
                <Field
                  className={`form-control`}
                  name="name"
                  type="text"
                  placeholder="Please enter a Brand Name"
                />
                {errors.name && touched.name ? (
                  <span className="text-danger ms-2"> {errors.name}</span>
                ) : null}
              </div>
              <div className={`mb-4 ${style["max-w-xl"]}`}>
                <label className="mb-1" htmlFor="category">
                  Category
                </label>
                <Field
                  type="text"
                  className={`form-control me-2`}
                  name="category"
                  placeholder="Please enter a Brand Category"
                />
                {errors.category && touched.category ? (
                  <span className="text-danger ms-2">{errors.category}</span>
                ) : null}
              </div>
              <div className={`mb-4 ${style["max-w-xl"]}`}>
                <label className="mb-1" htmlFor="image">
                  Image
                </label>
                <Field
                  type="file"
                  className={`form-control`}
                  name="image"
                  onChange={(event) => setImage(event.target.files[0])}
                />
                {errors.image && touched.image ? (
                  <span className="text-danger ms-2">{errors.image}</span>
                ) : null}
              </div>

              <div>
                <input
                  type="submit"
                  className={`btn px-3 rounded-pill ${dashStyle["dash-btn"]}`}
                  value="add brand"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BrandsAdd;
