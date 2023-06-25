// form validation
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

// style
import style from "../../../pages/dashboard/dashboard.module.css";

const ProductsSearch = ({ onSearch }) => {
  const searchSchema = Yup.object().shape({
    searchValue: Yup.string().required("Search value is required"),
  });

  return (
    <Formik
      initialValues={{
        searchValue: "",
      }}
      validationSchema={searchSchema}
      onSubmit={onSearch}
    >
      {({ errors, touched, isValidating }) => (
        <Form
          id={style["dash-search"]}
          className="m-0 mb-4"
        >
          <div className="form-group mb-3 mb-sm-0">
            <Field
              type="text"
              name="searchValue"
              placeholder="search by id"
              className={`form-control ${
                errors.searchValue && touched.searchValue ? "is-invalid" : ""
              }`}
            />
            <ErrorMessage
              name="searchValue"
              component="div"
              className="invalid-feedback"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProductsSearch;
