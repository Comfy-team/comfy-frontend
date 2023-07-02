import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../apis/config";
import CategoryForm from "./categoryForm";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import dashStyle from "./../../../pages/dashboard/dashboard.module.css";

const AddCategory = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    if (!values.image) {
      setErrorMessage("Image is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", values.image);

    axiosInstance
      .post("/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          "x-access-token": token,
        },
      })
      .then((res) => {
        setIsSubmitted(true);
        setTimeout(() => {
          navigate("/dashboard/categories");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Unable to add category, please try again.");
      });
  };

  return (
    <div className="ps-4">
      <h1 className={`py-3 ${dashStyle["fw-bold"]}`}>Add New Category</h1>
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
          Category added successfully!
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
        <CategoryForm
          initialValues={{
            name: "",
            image: null,
          }}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AddCategory;