//form validation
import { useState } from "react";

import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const CategoryForm = ({ initialValues, onSubmit }) => {

  const [imageUrl, setImageUrl] = useState(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Category Name is required"),
    image: Yup.mixed()
      .test("fileType", "Invalid file, Images only", (value) => {
        if (value && value.type) {
          return value.type.startsWith("image");
        }
        return true;
      }),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, setFieldValue, values }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="name" className="pb-2">
              Category Name
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter category name"
              autoComplete="off"
            />
            {errors.name && touched.name ? (
              <div className="text-danger">{errors.name}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="image" className="form-label pt-4">
              {initialValues.image ? "Update" : "Upload"} Category Image
            </label>
            <div>
              {values.image !== null ? (
                <img
                src={ imageUrl === null ?
                  process.env.REACT_APP_BASE_URL + "/" + initialValues.image
                  : imageUrl
                }
                alt={`Current category: ${values.name}`}
                className="img-thumbnail mb-2"
                width="100"
                name="image"
                /> 
                ):""}
            </div>
            
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              onChange={(event) => {
                setFieldValue("image", event.target.files[0]);
                setImageUrl(URL.createObjectURL(event.target.files[0]))
              }}
            />
            {errors.image && touched.image ? (
              <div className="text-danger">{errors.image}</div>
            ) : null}
          </div>
          <button type="submit" className="btn btn-primary mt-4">
            {initialValues.name ? "Update" : "Add"} Category
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CategoryForm;
