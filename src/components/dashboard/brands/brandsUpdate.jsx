import { useState ,useEffect} from "react";
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
import style from "./brands.module.css";


const BrandsUpdate = () => {
  const [brandById, setBrandById] = useState(null);
  const [showBtnSpinner, SetShowBtnSpinner] = useState(false);
  const [image, setImage] = useState(null);
  const token = localStorage.getItem("userToken");
  const { id } = useParams();
  const dispatch = useDispatch();

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
    const formData = new FormData();
    formData.append("_id", id)
    formData.append("name", brandById.name);
    formData.append("category", brandById.category);
    if(image  !== null){
      formData.append("image", image)
    }
    
    axiosInstance
      .patch(`/brands`, formData,{
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          "x-access-token": token,
        },
      })
      .then((res) => {
        SetShowBtnSpinner(false);
        dispatch(setBrands(res.data))
        dispatch(showToast("brand updated successfully!"));
      })
      .catch((error) => {
        console.log(error)
        SetShowBtnSpinner(false);
        dispatch(showToast("Unable to update brand, please try again."));
      });
  };

  if (!brandById) {
    // Display a loading spinner or message while the data is being fetched
    return <Spinner/> ;
  }
  // Extract the file name from the path
  
  return (
    <div className="ps-5 py-4">
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
                  placeholder="Please enter the Brand Name"
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
                  placeholder="Please enter the Brand Category"
                />
                {errors.category && touched.category ? (
                  <span className="text-danger ms-2">{errors.category}</span>
                ) : null}
              </div>
              <div className={`mb-4 ${style["max-w-xl"]}`}>
                <label className="mb-1" htmlFor="image">
                  Image
                </label>
                <div>
                  {brandById.image && (
                    <img
                      src={image === null ?
                        process.env.REACT_APP_BASE_URL + "/" + brandById.image
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
                  onChange={(event) => {setImage(event.target.files[0]);}}
                />
                {errors.image && touched.image ? (
                  <span className="text-danger ms-2">{errors.image}</span>
                ) : null}
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
