import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

//components
import axiosInstance from "../../../apis/config";
import CategoryForm from "./categoryForm";
import { showToast } from "../../../store/slices/toastSlice";
import Spinner from "../../common/spinner";

const CategoryUpdate = () => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance
      .get(`/categories/${id}`)
      .then((res) => {
        setInitialValues({
          name: res.data.name,
          image: res.data.image,
        });
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Unable to fetch category data, please try again.");
      });
  }, [dispatch, id]);

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
        dispatch(showToast("Category was updated successfully!"));
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Unable to update category data, please try again.");
      });
  };

  if (!initialValues) {
    return <Spinner/>
  }

  return (
    <div className="px-4 py-4">
      <h1 className="fs-4 py-4">Update Category</h1>
      {errorMessage ? (
        <div className="alert alert-danger">{errorMessage}</div>
      ) : null}
      <CategoryForm initialValues={initialValues} onSubmit={handleSubmit}/>
    </div>
  );
};

export default CategoryUpdate;
