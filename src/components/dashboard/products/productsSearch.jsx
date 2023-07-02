// form validation
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

// style
import style from "../../../pages/dashboard/dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ProductsSearch = ({ onSearch, searchParams, onRemoveSearch }) => {
  const searchSchema = Yup.object().shape({
    searchValue: Yup.string().required("Search value is required"),
  });

  return (
    <Formik
      initialValues={{
        searchValue: searchParams?.get("query") || "",
      }}
      validationSchema={searchSchema}
      onSubmit={onSearch}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form id={style["dash-search"]} className="m-0 mb-4">
          <div className="form-group mb-3 mb-sm-0">
            <div className="position-relative pe-4">
              {values.searchValue && (
                <button
                  type="button"
                  onClick={() => {
                    setFieldValue("searchValue", "");
                    onRemoveSearch();
                  }}
                  className="btn p-0 position-absolute end-0 top-50 translate-middle-y"
                >
                  <FontAwesomeIcon icon={faXmark} />
                  <span className="visually-hidden">erase search</span>
                </button>
              )}
              <Field
                type="text"
                name="searchValue"
                placeholder="search by name, category or brand"
                className={`form-control ${
                  errors.searchValue && touched.searchValue ? "is-invalid" : ""
                }`}
              />
            </div>
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
