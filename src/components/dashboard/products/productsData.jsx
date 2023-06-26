import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";

// components
import DashPagination from "../dashPagination";
import axiosInstance from "../../../apis/config";
import Spinner from "../../common/spinner";
import ProductsSearch from "./productsSearch";

// style
import style from "../../../pages/dashboard/dashboard.module.css";

const ProductsData = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [data, setData] = useState(null);
  const [showSpinner, setShowSpinner] = useState(true);
  const [productToDelete, setProductToDelete] = useState("");

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleDelete = (id, brand, category) => {
    setProductToDelete(id);
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
        console.log(res);
        let newData = [...data].filter((ele) => ele._id !== id);
        setData(newData);
        setProductToDelete("");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setShowSpinner(true);
    axiosInstance
      .get("/products/dashboard", {
        params: {
          page,
        },
      })
      .then((res) => {
        setData(res.data.data);
        setTotalPages(res.data.totalPages);
        setTotalProducts(res.data.totalProducts);
        setShowSpinner(false);
      })
      .catch((error) => console.log(error));
  }, [page]);

  return !showSpinner ? (
    data.length > 0 ? (
      <>
        <h1 className="h4 mb-4 py-3">Products (total: {totalProducts})</h1>
        <div className="d-flex align-items-start justify-content-between">
          <ProductsSearch />
          <Link
            to="/dashboard/products/add"
            className={`text-capitalize btn ${style["dash-btn"]} d-block`}
          >
            Add a product
          </Link>
        </div>
        <div className="table-responsive mb-5">
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
                <tr key={product._id} className="overflow-hidden">
                  <th scope="row" className={style["dash-prod-id-holder"]}>
                    <span className={`d-block ${style["dash-prod-id"]}`}>
                      {product._id}
                    </span>
                  </th>
                  <td>{product.name}</td>
                  <td>
                    <span className={`${style.description} overflow-hidden`}>
                      {product.description}
                    </span>
                  </td>
                  <td className="text-center">{product.price.toFixed(2)}</td>
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
                          src={process.env.REACT_APP_BASE_URL + "/" + ele.src}
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
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="btn p-0 border-0 outline-0 text-danger"
                          onClick={() =>
                            handleDelete(
                              product._id,
                              product.brand,
                              product.category
                            )
                          }
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
        </div>
        <DashPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </>
    ) : (
      <p>No products to show</p>
    )
  ) : (
    <Spinner />
  );
};

export default ProductsData;
