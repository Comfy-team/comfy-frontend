import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../apis/config";
import CategoryForm from "./categoryForm";

const CategoryUpdate = () => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`/categories/${id}`)
      .then((res) => {
        setInitialValues({
          name: res.data.name,
          image: null,
        });
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Unable to fetch category data, please try again.");
      });
  }, [id]);

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", values.name);

    if (values.image) {
      formData.append("image", values.image);
    } else if (initialValues.image) {
      formData.append("image", initialValues.image);
    }

    axiosInstance
      .patch(`/categories`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          "x-access-token": token,
        },
      })
      .then(() => {
        setIsSubmitted(true);
        setTimeout(() => {
          navigate("/dashboard/categories");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
       setErrorMessage("Unable to update category data, please try again.");
      });
  };

  return (
    <div className="ps-4">
      <h1>Update Category</h1>
      {errorMessage ? (
        <div className="alert alert-danger">{errorMessage}</div>
      ) : isSubmitted ? (
        <div className="alert alert-success">Category updated successfully!</div>
      ) : null}
      {initialValues ? (
        <CategoryForm initialValues={initialValues} onSubmit={handleSubmit} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CategoryUpdate;