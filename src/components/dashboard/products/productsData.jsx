import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// components
import DashPagination from "../dashPagination";
import axiosInstance from "../../../apis/config";
import Spinner from "../../common/spinner";
import ProductsSearch from "./productsSearch";
import RemoveProductWarning from "../../common/removeProductWarning";
import { showToast } from "../../../store/slices/toastSlice";

// style
import style from "../../../pages/dashboard/dashboard.module.css";

const ProductsData = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [showSpinner, setShowSpinner] = useState(true);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    query: "",
  });
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    setPage(page);
    setSearchParams({ page, query: searchParams.get("query") });
  };

  const handleRemoveProduct = (id, brand, category) => {
    const token = localStorage.getItem("userToken");
    axiosInstance
      .delete("/products", {
        params: {
          _id: id,
          brand,
          category,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(showToast("Product was deleted successfully!"));
          let newData = [...data].filter((ele) => ele._id !== id);
          setData(newData);
          setProductToDelete(null);
        } else {
          dispatch(
            showToast("Failed to delete product! Please try again later!")
          );
        }
      })
      .catch((error) => console.log(error));
  };

  const getResults = (query, page = 1) => {
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
        setTotalProducts(res.data.totalResults);
        setShowSpinner(false);
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = (values, { setSubmitting }) => {
    setSubmitting(false);
    setSearchParams({ page: 1, query: values.searchValue });
  };

  const handleRemoveSearch = () => {
    setSearchParams({ page: 1, query: "" });
  };

  useEffect(() => {
    setShowSpinner(true);
    if (searchParams.get("page")) {
      setPage(+searchParams.get("page"));
    }
    if (searchParams.get("query")) {
      getResults(searchParams.get("query"), +searchParams.get("page"));
    } else {
      axiosInstance
        .get("/products/dashboard", {
          params: {
            page: searchParams.get("page") ? +searchParams.get("page") : page,
          },
        })
        .then((res) => {
          setData(res.data.data);
          setTotalPages(res.data.totalPages);
          setTotalProducts(res.data.totalProducts);
          setShowSpinner(false);
        })
        .catch((error) => console.log(error));
    }
  }, [searchParams]);

  return (
    <>
      <div className="px-4">
        <h1 className="h4 mb-4 py-3">Products (total: {totalProducts})</h1>
        <div className="d-flex flex-md-row flex-column-reverse align-items-md-start justify-content-between px-md-2">
          <ProductsSearch
            onSearch={handleSearch}
            searchParams={searchParams}
            onRemoveSearch={handleRemoveSearch}
          />
          <Link
            to="/dashboard/products/add"
            className={`text-capitalize btn ${style["dash-btn"]} align-self-center align-self-md-start d-flex gap-1 align-items-center mb-md-0 mb-5`}
          >
          <FontAwesomeIcon icon={faPlus} /> <span>Add a product</span>
          </Link>
        </div>
      </div>
      {!showSpinner ? (
        <>
          <div className="table-responsive mb-5">
            {data.length > 0 ? (
              <table className="table border-top">
                <thead>
                  <tr>
                    <th scope="col">#id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Category</th>
                    <th scope="col" className="text-center">
                      Brand
                    </th>
                    <th scope="col">Colors</th>
                    <th scope="col">Images</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((product) => (
                    <tr key={product._id}>
                      <th scope="row" className={style["dash-prod-id-holder"]}>
                        <span className={`d-block ${style["dash-prod-id"]}`}>
                          {product._id}
                        </span>
                      </th>
                      <td>{product.name}</td>
                      <td>
                        <span
                          className={`${style.description} overflow-hidden`}
                        >
                          {product.description}
                        </span>
                      </td>
                      <td className="text-center">
                        {product.price.toFixed(2)}
                      </td>
                      <td className="text-center">{product.discount}%</td>
                      <td className="text-center">{product.stock}</td>
                      <td className="text-center text-capitalize">
                        {product.category.name}
                      </td>
                      <td className="text-center">{product.brand.name}</td>
                      <td>
                        <div className="d-flex flex-column align-items-center justify-content-center gap-1">
                          {product.colors.map((ele) => (
                            <span
                              key={ele}
                              className={`${style["dash-prod-clr"]} d-inline-block rounded-circle border border-2`}
                              style={{ backgroundColor: ele }}
                            ></span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column justify-content-center align-items-center gap-1">
                          {product.images.map((ele) => (
                            <img
                              key={ele._id}
                              src={
                                process.env.REACT_APP_BASE_URL + "/" + ele.src
                              }
                              alt={product.name}
                              className={`${style["dash-prod-img"]} border img-fluid rounded-2`}
                            />
                          ))}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          <Link
                            to={`/dashboard/products/update/${product._id}`}
                            className={`btn p-0 border-0 outline-0 ${style["dash-purple"]}`}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                            <span className="visually-hidden">update</span>
                          </Link>
                          {productToDelete === product._id ? (
                            <div className="spinner-border" role="status">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          ) : (
                            <button
                              type="button"
                              className="btn p-0 border-0 outline-0 text-danger"
                              onClick={() => {
                                setProductToDelete(product);
                                setShowWarning(true);
                              }}
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                              <span className="visually-hidden">delete</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center fs-4">"No products were found"</p>
            )}
          </div>
          <DashPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <Spinner />
      )}
      {showWarning && productToDelete && (
        <RemoveProductWarning
          onRemove={() =>
            handleRemoveProduct(
              productToDelete._id,
              productToDelete.brand,
              productToDelete.category
            )
          }
          onCancel={() => {
            setShowWarning(false);
            setProductToDelete(null);
          }}
        />
      )}
    </>
  );
};

export default ProductsData;
