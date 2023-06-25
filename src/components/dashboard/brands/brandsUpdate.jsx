import { useState ,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";

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


const BrandsUpdate = () => {
  const [brandById, setBrandById] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [image, setImage] = useState(null);
  const token = localStorage.getItem("userToken");
  const { id } = useParams();
  const navigate=useNavigate();
  useEffect(() => {
    axiosInstance
      .get(`/brands/${id}`)
      .then((res) => {
        console.log(res.data);
        setBrandById(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const updateBrandSubmit = (brandById) => {
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
        console.log(res.data);
        setIsSubmitted(true);
        setTimeout(()=>{
          navigate("/dashboard/brands")
        },2000)
      })
      .catch((error) => {
        console.log(error)
        setErrorMessage("Unable to update, please try again.")});
  };
  if (!brandById) {
    // Display a loading spinner or message while the data is being fetched
    return <div>Loading...</div>;
  }
  // Extract the file name from the path
  
  return (
    <div className="ps-4">
      <h1 className={`py-3 ${dashStyle["fw-bold"]}`}>Update Brand</h1>
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
          Account Updated successfully!
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
                      alt="Current brand image"
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

              <div>
                <input
                  type="submit"
                  className={`btn px-3 mb-3 rounded-pill ${dashStyle["dash-btn"]}`}
                  value="update brand"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BrandsUpdate;
