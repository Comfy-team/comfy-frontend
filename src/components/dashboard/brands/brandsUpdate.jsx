import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// component
import axiosInstance from "../../../apis/config";
import { showToast } from "../../../store/slices/toastSlice";
import { setBrands } from "../../../store/slices/brandsSlice";
import Spinner from "../../common/spinner";

// style
import dashStyle from "./../../../pages/dashboard/dashboard.module.css";

const BrandsUpdate = () => {
  const [brandById, setBrandById] = useState(null);
  const [showBtnSpinner, SetShowBtnSpinner] = useState(false);
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  const token = localStorage.getItem("userToken");
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

  useEffect(() => {
    axiosInstance
      .get(`/brands/${id}`)
      .then((res) => {
        setBrandById(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateBrandSubmit = (brandById) => {
    SetShowBtnSpinner(true);
    if(imageError !== null){
       SetShowBtnSpinner(false);
       return;
    }
    const formData = new FormData();
    formData.append("_id", id);
    formData.append("name", brandById.name);
    formData.append("category", brandById.category);
    if (image !== null) {
      formData.append("image", image);
    }
    
    axiosInstance
      .patch(`/brands`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          "x-access-token": token,
        },
      })
      .then((res) => {
        SetShowBtnSpinner(false);
        dispatch(setBrands(res.data));
        dispatch(showToast("brand updated successfully!"));
      })
      .catch((error) => {
        console.log(error);
        SetShowBtnSpinner(false);
        dispatch(showToast("Unable to update brand, please try again."));
      });
  };

  if (!brandById) {
    // Display a loading spinner or message while the data is being fetched
    return <Spinner />;
  }

  return (
    <div className="px-3 px-md-4 py-4">
      <h1 className={`py-3 h4 ${dashStyle["fw-bold"]}`}>Update Brand</h1>

      <div>
        <Formik
          initialValues={{
            name: brandById.name,
            category: brandById.category,
          }}
          validationSchema={Yup.object({
            name: Yup.string().optional().nullable(),
            category: Yup.string().optional().nullable(),
          })}
          onSubmit={updateBrandSubmit}
        >
          {({ errors, touched }) => (
            <Form encType="multipart/form-data">
              <div className={`mb-4`}>
                <label className="mb-1" htmlFor="name">
                  Name
                </label>
                <Field
                  className={`form-control`}
                  name="name"
                  type="text"
                  placeholder="Please enter the Brand Name"
                />
                {errors.name && touched.name ? (
                  <span className="text-danger ms-2"> {errors.name}</span>
                ) : null}
              </div>
              <div className={`mb-4`}>
                <label className="mb-1" htmlFor="category">
                  Category
                </label>
                <Field
                  type="text"
                  className={`form-control me-2`}
                  name="category"
                  placeholder="Please enter the Brand Category"
                />
                {errors.category && touched.category ? (
                  <span className="text-danger ms-2">{errors.category}</span>
                ) : null}
              </div>
              <div className={`mb-4`}>
                <label className="mb-1" htmlFor="image">
                  Image
                </label>
                <div>
                  {brandById.image && (
                    <img
                      src={
                        image === null
                          ? process.env.REACT_APP_BASE_URL +
                            "/" +
                            brandById.image
                          : URL.createObjectURL(image)
                      }
                      alt="Current brand"
                      className="img-thumbnail mb-2"
                      width="100"
                      name="image"
                    />
                  )}
                </div>
                <Field
                  type="file"
                  className={`form-control`}
                  name="image"
                  accept="image/*"
                  onChange={(event) => {
                    const selectedFile = event.target.files[0];
                    if (
                      selectedFile &&
                      !allowedTypes.includes(selectedFile.type)
                    ) {
                      setImageError("Only png, jpeg, or jpg files are allowed");
                    } else {
                      setImageError(null);
                      setImage(selectedFile);
                    }
                  }}
                />
                {imageError && (
                  <span className="text-danger ms-2">{imageError}</span>
                )}
              </div>

              <div className="mb-4">
                {!showBtnSpinner ? (
                  <input
                    type="submit"
                    className={`btn px-3 mb-3 rounded-pill ${dashStyle["dash-btn"]}`}
                    value="update brand"
                  />
                ) : (
                  <button
                    type="button"
                    className={`btn px-3 rounded-pill ${dashStyle["dash-btn"]}`}
                  >
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BrandsUpdate;
