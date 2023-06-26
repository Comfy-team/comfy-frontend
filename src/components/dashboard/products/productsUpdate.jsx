import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// form validation
import { Form, Formik } from "formik";
import * as Yup from "yup";

// components
import axiosInstance from "../../../apis/config";
import Spinner from "../../common/spinner";
import ProductForm from "./productForm";

// style
import style from "../../../pages/dashboard/dashboard.module.css";

const ProductsUpdate = () => {
  const [data, setData] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageError, setImageError] = useState("");
  const { id } = useParams();

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

  const handleUpdateProduct = (values, { setSubmitting }) => {
    setSubmitting(false);
    if (imageError) return;
    if (selectedImages.length === 0) {
      setImageError("Enter at least one image");
      return;
    }
    const token = localStorage.getItem("userToken");
    const formData = new FormData();
    // append data
    formData.append("_id", data._id);
    values.colors.forEach((color) => formData.append("colors[]", color));
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
    axiosInstance
      .patch("/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          "x-access-token": token,
        },
      })
      .then((res) => {
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
    <>
      <h1 className="h4 mb-4 py-3">Edit Product</h1>
      <Formik
        initialValues={{
          name: data.name,
          description: data.description,
          price: data.price,
          discount: data.discount,
          stock: data.stock,
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
              errors={errors}
              touched={touched}
              values={values}
              imageError={imageError}
              productName={data.name}
              selectedImages={selectedImages}
              onImageInput={onImageInput}
              setFieldValue={setFieldValue}
              setSelectedImages={setSelectedImages}
            />
            <button type="submit" className={`btn ${style["dash-btn"]}`}>
              Update
            </button>
          </Form>
        )}
      </Formik>
    </>
  ) : (
    <Spinner />
  );
};

export default ProductsUpdate;
