import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

// form validation
import { Form, Formik } from "formik";
import * as Yup from "yup";

// components
import axiosInstance from "../../../apis/config";
import Spinner from "../../common/spinner";
import ProductForm from "./productForm";
import { showToast } from "../../../store/slices/toastSlice";

// style
import style from "../../../pages/dashboard/dashboard.module.css";

const ProductsUpdate = () => {
  const [data, setData] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageError, setImageError] = useState("");
  const [stockError, setStockError] = useState(false);
  const [showBtnSpinner, SetShowBtnSpinner] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().min(1, "minimum is 1").required("Price is required"),
    discount: Yup.number()
      .min(0, "minimum is 0")
      .integer("discount is integer")
      .required("Discount is required"),
    category: Yup.string().required("Category is required"),
    brand: Yup.string().required("Brand is required"),
    colors: Yup.array()
      .min(1, "Please select a color")
      .required("Color is required"),
  });

  const handleUpdateProduct = (values, { setSubmitting }) => {
    setSubmitting(false);
    // check if there're errors
    if (imageError || stockError) return;
    if (selectedImages.length === 0) {
      setImageError("Enter at least one image");
      return;
    }
    SetShowBtnSpinner(true);
    const token = localStorage.getItem("userToken");
    // append data
    const formData = new FormData();
    formData.append("_id", data._id);
    values.colors.forEach((color) =>
      formData.append("colors[]", JSON.stringify(color))
    );
    selectedImages.forEach((image) =>
      image.src
        ? formData.append("images", JSON.stringify(image))
        : formData.append("images", image)
    );
    Object.keys(values).forEach((key) => {
      if (
        key === "colors" ||
        ((key === "brand" || key === "category") &&
          data[key]._id === values[key]) ||
        data[key] === values[key]
      ) {
        return;
      }
      formData.append(key, values[key]);
    });
    // send request
    axiosInstance
      .patch("/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          "x-access-token": token,
        },
      })
      .then((res) => {
        SetShowBtnSpinner(false);
        dispatch(showToast("Product was updated successfully!"));
      })
      .catch((error) => {
        console.log(error);
        SetShowBtnSpinner(false);
        dispatch(
          showToast("Failed to update product! Please try again later.")
        );
      });
  };

  const onImageInput = (e) => {
    let files = Array.from(e.target.files);
    for (let i = 0; i < files.length; i++) {
      if (!files[i].type.startsWith("image")) {
        setImageError("Invalid file, Images only");
        return;
      }
      setImageError("");
    }
    // prevent adding image already exists in DB
    files = files.filter(
      (file) =>
        selectedImages.findIndex((ele) => {
          const imgURL = ele.src.split("\\");
          return imgURL[imgURL.length - 1] === file.name;
        }) === -1
    );
    setSelectedImages([...selectedImages, ...files]);
  };

  useEffect(() => {
    axiosInstance
      .get(`/products/${id}`)
      .then((res) => {
        setData(res.data);
        setSelectedImages(res.data.images);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return data ? (
    <div className="px-3 px-md-4">
      <h1 className="h4 mb-4 py-3">Edit Product</h1>
      <Formik
        initialValues={{
          name: data.name,
          description: data.description,
          price: data.price,
          discount: data.discount,
          category: data.category._id,
          brand: data.brand._id,
          colors: data.colors,
        }}
        validationSchema={formSchema}
        onSubmit={handleUpdateProduct}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <ProductForm
              form="update"
              errors={errors}
              touched={touched}
              values={values}
              imageError={imageError}
              onStockError={(value) => setStockError(value)}
              productName={data.name}
              selectedImages={selectedImages}
              onImageInput={onImageInput}
              setFieldValue={setFieldValue}
              setSelectedImages={setSelectedImages}
            />
            {!showBtnSpinner ? (
              <button type="submit" className={`btn ${style["dash-btn"]}`}>
                Update
              </button>
            ) : (
              <button
                type="button"
                className={`btn ${style["dash-btn"]} text-center`}
              >
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  ) : (
    <Spinner />
  );
};

export default ProductsUpdate;
