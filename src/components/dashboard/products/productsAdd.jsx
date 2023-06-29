import { useState } from "react";
import { useDispatch } from "react-redux";

// form validation
import { Form, Formik } from "formik";
import * as Yup from "yup";

// components
import axiosInstance from "../../../apis/config";
import ProductForm from "./productForm";
import { showToast } from "../../../store/slices/toastSlice";

// style
import style from "../../../pages/dashboard/dashboard.module.css";

const ProductsAdd = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageError, setImageError] = useState("");
  const dispatch = useDispatch();

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().min(1, "minimum is 1").required("Price is required"),
    discount: Yup.number()
      .min(0, "minimum is 0")
      .required("Discount is required"),
    stock: Yup.number().min(0, "minimum is 0").required("Stock is required"),
    category: Yup.string().required("Category is required"),
    brand: Yup.string().required("Brand is required"),
    colors: Yup.array()
      .min(1, "Please select a color")
      .required("Color is required"),
  });

  const handleAddProduct = (values, { setSubmitting }) => {
    setSubmitting(false);
    if (imageError) return;
    if (selectedImages.length === 0) {
      setImageError("Enter at least one image");
      return;
    }
    const token = localStorage.getItem("userToken");
    const formData = new FormData();
    // append data
    values.colors.forEach((color) => formData.append("colors[]", color));
    selectedImages.forEach((image) => formData.append("images", image));
    Object.keys(values).forEach((key) => {
      if (key === "colors") {
        return;
      }
      formData.append(key, values[key]);
    });
    axiosInstance
      .post("/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          "x-access-token": token,
        },
      })
      .then((res) => {
        dispatch(showToast("Product was added successfully!"));
        console.log(res);
      })
      .catch((error) => console.log(error));
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
    setSelectedImages([...selectedImages, ...files]);
  };
  
  return (
    <>
      <h1 className="h4 mb-4 py-3">Add Product</h1>
      <Formik
        initialValues={{
          name: "",
          description: "",
          price: 1,
          discount: 0,
          stock: 0,
          category: "",
          brand: "",
          colors: [],
        }}
        validationSchema={formSchema}
        onSubmit={handleAddProduct}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <ProductForm
              errors={errors}
              touched={touched}
              values={values}
              imageError={imageError}
              productName={values.name}
              selectedImages={selectedImages}
              onImageInput={onImageInput}
              setFieldValue={setFieldValue}
              setSelectedImages={setSelectedImages}
            />
            <button type="submit" className={`btn ${style["dash-btn"]}`}>
              Add
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ProductsAdd;
