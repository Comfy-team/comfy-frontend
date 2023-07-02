import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const CategoryForm = ({ initialValues, onSubmit }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Category Name is required"),
    image: Yup.mixed()
      .test("fileSize", "File size too large", (value) => {
        if (value && value.size) {
          return value.size <= 2000000;
        }
        return true;
      })
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
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              onChange={(event) => {
                setFieldValue("image", event.target.files[0]);
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