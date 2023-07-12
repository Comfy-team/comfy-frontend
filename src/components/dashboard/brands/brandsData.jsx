import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// components
import DashPagination from "../dashPagination";
import axiosInstance from "../../../apis/config";
import { showToast } from "../../../store/slices/toastSlice";
import { setBrands } from "../../../store/slices/brandsSlice";
import ConfirmPopup from "../../common/confirmPopup";
import Spinner from "../../common/spinner";

// style
import dashStyle from "./../../../pages/dashboard/dashboard.module.css";
import style from "./brands.module.css";

const BrandsData = () => {
  const [allBrands, setAllBrands] = useState([]);
  const [allBrandsInPage, setAllBrandsInPage] = useState([]);
  const [totalBrands, setTotalBrands] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [brandIdToDelete, setBrandIdToDelete] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const token = localStorage.getItem("userToken");
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery === "") {
      // If search query is empty, show all users
      axiosInstance
        .get(`/brands`, {
          params: {
            page: currentPage,
          },
        })
        .then((res) => {
          setShowSpinner(false); 
          setAllBrandsInPage(res.data);
          setAllBrands(res.data.data);
          setTotalBrands(res.data.totalBrands);
          dispatch(setBrands(res.data.allData))
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // If search query is not empty, fetch search results
      axiosInstance
        .get(`/brands/search`, {
          params: {
            search: searchQuery,
            page: currentPage,
          },
        })
        .then((res) => {
          setAllBrandsInPage(res.data);
          setAllBrands(res.data.data);
          setTotalBrands(res.data.totalBrands);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentPage, searchQuery]);

  // search by brand id or name
  function handleSearch(event) {
    const query = event.target.value;
    setCurrentPage(1);
    setSearchQuery(query);
    if (query === "") {
      // If search query is empty, show all users
      setAllBrandsInPage(allBrands);
    } else {
      // If search query is not empty, fetch search results
      setAllBrandsInPage(allBrands);
    }
  }
  // Update current page state when page number is clicked
  function onPageChange(page) {
    setCurrentPage(page);
  }

  // delete brand by name
  function deleteBrand(id) {
    setShowWarning(false);
    axiosInstance
      .delete(`/brands/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-access-token": token,
        },
      })
      .then((res) => {
        dispatch(showToast("brand was deleted successfully!"));
        axiosInstance
          .get(`/brands`, {
            params: {
              page: currentPage,
            },
          })
          .then((res) => {
            setAllBrandsInPage(res.data);
            setAllBrands(res.data.data);
            setTotalBrands(res.data.totalBrands);
            setBrandIdToDelete("");
            dispatch(setBrands(res.data.allData))
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        showToast("Failed to delete brand! Please try again later!");
      });
  }
  return (
    <div className="py-4">
      <h1 className={`mb-2 h4 py-3 ps-4 ${dashStyle["fw-bold"]}`}>
        Brands (total: {totalBrands} )
      </h1>
      <div>
        <div className="row ms-4 me-3">
          <div className="my-4 row d-flex flex-column-reverse flex-md-row  align-items-center justify-content-between">
            <div className="col-12 col-md-6">
              <input
                className="form-control"
                type="search"
                placeholder="Search by brand id or brand name"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="col-10 col-md-6 d-flex justify-content-center justify-content-md-end  mb-5 mb-md-0">
              <Link
                to="./add"
                className={`btn text-capitalize ${dashStyle["dash-btn"]}`}
              >
                <FontAwesomeIcon icon={faPlus} /> Add New Brand
              </Link>
            </div>
          </div>
        </div>
        {!showSpinner ? (
          <>
        <div className="table-responsive mb-5">
          <table className="table border-top">
            <thead>
              <tr>
                <th scope="col" className="ps-4">
                  #ID
                </th>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Category</th>
                <th scope="col">Products</th>
                <th scope="col" className="text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {allBrands?.length > 0 ? (
                allBrands?.map((brand) => {
                  return (
                    <tr key={brand._id}>
                      <td className={`ps-4`}>{brand._id}</td>
                      <td>{brand.name}</td>
                      <td>
                        <img
                          className={`${style["brand-image"]}`}
                          src={
                            process.env.REACT_APP_BASE_URL + "/" + brand.image
                          }
                          alt="brand"
                        />
                      </td>
                      <td>{brand.category}</td>
                      <td className={style.brandProduct}>
                        {brand.products.length}
                      </td>
                      <td className="text-center">
                        <Link
                          to={`update/${brand._id}`}
                          className={`btn p-0 ${dashStyle["dash-purple"]}`}
                        >
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className={``}
                          />
                        </Link>
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className="btn p-0 ms-2 text-danger"
                          onClick={() => {
                            setBrandIdToDelete(brand._id);
                            setShowWarning(true);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No brand found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <DashPagination
          totalPages={allBrandsInPage.totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
        </>
        ) : (
          <Spinner />
        )}


        {showWarning && brandIdToDelete && (
          <ConfirmPopup
            msg={"Are you sure you want to remove brand?"}
            onConfirm={() => deleteBrand(brandIdToDelete)}
            onCancel={() => {
              setShowWarning(false);
              setBrandIdToDelete("");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BrandsData;
