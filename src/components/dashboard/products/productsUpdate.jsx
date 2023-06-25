// form validation
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

// style
import style from "../../../pages/dashboard/dashboard.module.css";

const ProductsUpdate = ({ onSubmit }) => {
  const searchSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().min(1, "minimum is 1").required("Price is required"),
    discount: Yup.number()
      .min(0, "minimum is 0")
      .required("Discount is required"),
    stock: Yup.number().min(0, "minimum is 0").required("Stock is required"),
  });

  return (
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
        images: "",
      }}
      validationSchema={searchSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isValidating }) => (
        <Form className="m-0 mb-4">
          <div className="form-group mb-3 mb-sm-0">
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
          <div className="form-group mb-3 mb-sm-0">
            <Field
              type="textarea"
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
          <div className="form-group mb-3 mb-sm-0">
            <Field
              type="number"
              name="price"
              min="1"
              placeholder="price"
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
          <div className="form-group mb-3 mb-sm-0">
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
          <div className="form-group mb-3 mb-sm-0">
            <Field
              type="number"
              name="stock"
              min="0"
              placeholder="stock"
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
        </Form>
      )}
    </Formik>
  );
};

export default ProductsUpdate;
