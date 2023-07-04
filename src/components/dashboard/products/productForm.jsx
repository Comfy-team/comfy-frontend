import { useEffect, useState } from "react";

// form validation
import { ErrorMessage, Field } from "formik";

// components
import axiosInstance from "../../../apis/config";
import ProductColor from "./productColor";
import ProductImage from "./productImage";

const ProductForm = ({
  errors,
  touched,
  values,
  imageError,
  productName,
  selectedImages,
  onImageInput,
  setFieldValue,
  setSelectedImages,
}) => {
  const [categories, setCategories] = useState(null);
  const [brands, setBrands] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#000000");

  useEffect(() => {
    axiosInstance
      .get("/brands")
      .then((res) => {
        setBrands(res.data.allData);
      })
      .catch((error) => console.log(error));

    axiosInstance
      .get("/categories")
      .then((res) => {
        setCategories(res.data.allData);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {/* name */}
      <div className="form-group mb-3">
        <label htmlFor="name" className="mb-1">
          Name
        </label>
        <Field
          type="text"
          name="name"
          placeholder="name"
          className={`form-control ${
            errors.name && touched.name ? "is-invalid" : ""
          }`}
        />
        <ErrorMessage
          name="name"
          component="div"
          className="invalid-feedback"
        />
      </div>
      {/* description */}
      <div className="form-group mb-3">
        <label htmlFor="description" className="mb-1">
          Description
        </label>
        <Field
          as="textarea"
          name="description"
          placeholder="description"
          className={`form-control ${
            errors.description && touched.description ? "is-invalid" : ""
          }`}
        />
        <ErrorMessage
          name="description"
          component="div"
          className="invalid-feedback"
        />
      </div>
      <div className="row m-0">
        {/* price */}
        <div className="col-4 px-0">
          <div className="form-group mb-3">
            <label htmlFor="price" className="mb-1">
              Price
            </label>
            <Field
              type="number"
              name="price"
              min="1"
              className={`form-control ${
                errors.price && touched.price ? "is-invalid" : ""
              }`}
            />
            <ErrorMessage
              name="price"
              component="div"
              className="invalid-feedback"
            />
          </div>
        </div>
        {/* discount */}
        <div className="col-4 px-2 px-md-3">
          <div className="form-group mb-3">
            <label htmlFor="discount" className="mb-1">
              Discount
            </label>
            <Field
              type="number"
              name="discount"
              min="0"
              placeholder="discount"
              className={`form-control ${
                errors.discount && touched.discount ? "is-invalid" : ""
              }`}
            />
            <ErrorMessage
              name="discount"
              component="div"
              className="invalid-feedback"
            />
          </div>
        </div>
        {/* stock */}
        <div className="col-4 px-0">
          <div className="form-group mb-3">
            <label htmlFor="stock" className="mb-1">
              Stock
            </label>
            <Field
              type="number"
              name="stock"
              min="0"
              className={`form-control ${
                errors.stock && touched.stock ? "is-invalid" : ""
              }`}
            />
            <ErrorMessage
              name="stock"
              component="div"
              className="invalid-feedback"
            />
          </div>
        </div>
      </div>
      <div className="row m-0">
        {/* category */}
        <div className="col-6 ps-0 pe-2 pe-md-1">
          <div className="form-group mb-3">
            <label htmlFor="category" className="mb-1">
              Category
            </label>
            <Field
              name="category"
              as="select"
              className={`form-control text-capitalize ${
                errors.category && touched.category ? "is-invalid" : ""
              }`}
            >
              <option value="">Category</option>
              {categories?.map((ele) => (
                <option key={ele._id} value={ele._id}>
                  {ele.name}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="category"
              component="div"
              className="invalid-feedback"
            />
          </div>
        </div>
        {/* brand */}
        <div className="col-6 pe-0 pe-2">
          <div className="form-group mb-3">
            <label htmlFor="brand" className="mb-1">
              Brand
            </label>
            <Field
              name="brand"
              as="select"
              className={`form-control ${
                errors.brand && touched.brand ? "is-invalid" : ""
              }`}
            >
              <option value="">Brand</option>
              {brands?.map((ele) => (
                <option key={ele._id} value={ele._id}>
                  {ele.name}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="brand"
              component="div"
              className="invalid-feedback"
            />
          </div>
        </div>
      </div>
      {/* colors */}
      <div className="form-group mb-3">
        <label htmlFor="colors" className="mb-1">
          Colors
        </label>
        <div
          className={`d-flex align-items-center gap-3 flex-wrap ${
            values.colors?.length > 0 ? "mb-3 mt-2" : ""
          }`}
        >
          {values.colors?.map((color, index) => (
            <ProductColor
              key={color}
              color={color}
              onDelete={() =>
                setFieldValue(
                  "colors",
                  values.colors.filter((ele) => ele !== color)
                )
              }
            />
          ))}
        </div>
        <Field
          type="color"
          name="colors"
          className={`form-control ${
            errors.colors && touched.colors ? "is-invalid" : ""
          }`}
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          onBlur={(e) =>
            setFieldValue("colors", [
              ...new Set([...values.colors, e.target.value]),
            ])
          }
        />
        <ErrorMessage
          name="colors"
          component="div"
          className="invalid-feedback"
        />
      </div>
      {/* images */}
      <div className="form-group mb-4 pb-4">
        <label htmlFor="images" className="mb-1">
          Images
        </label>
        <div
          className={`d-flex align-items-center gap-3 flex-wrap ${
            selectedImages?.length > 0 ? "mb-3 mt-2" : ""
          }`}
        >
          {selectedImages?.map((image, index) => (
            <ProductImage
              key={image._id || `${image.name}-${index}`}
              src={
                image.src
                  ? process.env.REACT_APP_BASE_URL + "/" + image.src
                  : URL.createObjectURL(image)
              }
              productName={productName}
              onDelete={() => {
                setSelectedImages(
                  selectedImages?.filter((ele) => {
                    return image._id
                      ? ele._id !== image._id
                      : ele.name !== image.name;
                  })
                );
              }}
            />
          ))}
        </div>
        <Field
          type="file"
          name="images"
          multiple
          className={`form-control ${imageError ? "is-invalid" : ""}`}
          onChange={onImageInput}
        />
        {imageError && <p className="invalid-feedback">{imageError}</p>}
      </div>
    </>
  );
};

export default ProductForm;
