import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

// for validation
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// component
import axiosInstance from "../../apis/config";
import SearchCard from "../../components/searchPage/searchCard";
import PagePagination from "../../components/shop/pagePagination";
import Spinner from "../../components/common/spinner";

// style
import style from "./searchPage.module.css";

const SearchPage = () => {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    query: "",
  });
  const searchContent = useRef();
  const searchSchema = Yup.object().shape({
    searchValue: Yup.string().required("Search value is required"),
  });

  const getData = (query, page = 1) => {
    setPage(+page);
    axiosInstance
      .get("/products/search", {
        params: {
          search: query,
          page,
        },
      })
      .then((res) => {
        setData(res.data.data);
        setTotalPages(res.data.totalPages);
        setTotalResults(res.data.totalResults);
      })
      .catch((error) => console.log(error));
  };

  const handlePageChange = (page) => {
    setData(null);
    setSearchParams({ page, query: searchParams.get("query") });
    searchContent.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setData(null);
    const searchQuery = searchParams.get("query");
    if (searchQuery) {
      getData(searchQuery, searchParams.get("page"));
      setQuery(searchQuery);
    }
  }, [searchParams]);

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    setSearchParams({ page: 1, query: values.searchValue });
    setQuery(values.searchValue);
  };

  return (
    <div id="search-page" className={`${style["search-page"]} py-5`}>
      <div className="container-fluid py-3">
        <Formik
          initialValues={{
            searchValue: searchParams.get("query") || "",
          }}
          validationSchema={searchSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="row justify-content-center m-0 mb-5">
              <div className="form-group col-sm-9 col-lg-6 mb-3 mb-sm-0">
                <Field
                  type="text"
                  name="searchValue"
                  className={`form-control ${
                    errors.searchValue && touched.searchValue
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="searchValue"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div
                className={`${style["submit-holder"]} col-sm-3 col-md-2 align-self-start`}
              >
                <button
                  type="submit"
                  className="btn py-sm-2 p-0 h-100 w-100 btn-bg-dark text-white"
                >
                  Search
                </button>
              </div>
            </Form>
          )}
        </Formik>
        {data ? (
          data.length > 0 ? (
            <div ref={searchContent}>
              <h1 className="h4 mb-4 px-2">Total Results: {totalResults}</h1>
              <div className="row m-0 row-gap-3 mb-5">
                {data.map((product) => (
                  <div key={product._id} className="sol-sm-6 col-md-4">
                    <SearchCard product={product} query={query} />
                  </div>
                ))}
              </div>
              <PagePagination
                totalPages={totalPages}
                currentPage={page}
                onPageChange={handlePageChange}
              />
            </div>
          ) : (
            <h2 className="text-center h5">
              Sorry, can't find matching products
            </h2>
          )
        ) : query ? (
          <Spinner />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SearchPage;
