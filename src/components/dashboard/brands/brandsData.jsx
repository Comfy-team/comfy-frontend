import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// components
import DashPagination from "../dashPagination";
import axiosInstance from "../../../apis/config";

// style
import dashStyle from "./../../../pages/dashboard/dashboard.module.css";
import style from "./brands.module.css";
const BrandsData = () => {
  const [allBrands, setAllBrands] = useState([]);
  const [allBrandsInPage, setAllBrandsInPage] = useState([]);
  const [totalBrands, setTotalBrands] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteStatus, setDeleteStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const token = localStorage.getItem("userToken");
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
        setAllBrandsInPage(res.data);
        setAllBrands(res.data.data);
        setTotalBrands(res.data.totalBrands)
      })
      .catch((err) => {
        console.log(err);
      });
    }else{
      // If search query is not empty, fetch search results
      axiosInstance
        .get(`/brands/search`, {
          params:{
            search: searchQuery,
            page: currentPage,
          }
        }).then((res) => {
          setAllBrandsInPage(res.data);
          setAllBrands(res.data.data);
          setTotalBrands(res.data.totalBrands)
        }).catch((err) => {
          console.log(err);
        });
    }
  }, [currentPage,searchQuery]);

  // search by brand id or name
  function handleSearch(event){
    const query = event.target.value.trim().toLowerCase();
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
  function deleteBrand (id)  {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this brand?"
    )
    if (confirmDelete) {
      axiosInstance.delete(`/brands/${id}`,
       {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-access-token": token,
        },
      }).then(res=>{
        setDeleteStatus(`Brand ${id} deleted successfully.`)
        axiosInstance
        .get(`/brands`, {
          params: {
            page: currentPage,
          },
        })
        .then((res) => {
          setAllBrandsInPage(res.data);
          setAllBrands(res.data.data);
          setTotalBrands(res.data.totalBrands)
        })
        .catch((err) => {
          console.log(err);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };
  return (
    <>
      <h4 className={`mb-2 py-3 ps-4 ${dashStyle["fw-bold"]}`}>
        Brands (total: {totalBrands} )
      </h4>
      {deleteStatus ? (
        <div
          className={`alert alert-success alert-dismissible fade show ms-4 w-50`}
        >
          {deleteStatus}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setDeleteStatus(null)}
          ></button>
        </div>
      ) : (
        ""
      )}
      <div className="pb-3">
        <div className="row ms-4 me-3">
          <div className="my-4 row d-flex align-items-center justify-content-between">
            <div className="col-6">
              <input
                className="form-control"
                type="search"
                placeholder="Search by brand id or brand name"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="col-6 d-flex justify-content-end">
            <Link
              to="./add"
              className={`btn text-capitalize ${dashStyle["dash-btn"]}`}
            >
              <FontAwesomeIcon icon={faPlus} /> Add New Brand
            </Link>
            </div>
          </div>
        </div>
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
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {allBrands?.length > 0 ? (
              allBrands?.map((brand) => {
                return (
                  <tr key={brand._id}>
                    <td>{brand._id}</td>
                    <td>{brand.name}</td>
                    <td>
                      <img
                        className={`${style["brand-image"]}`}
                        src={process.env.REACT_APP_BASE_URL + "/" + brand.image}
                        alt="brand image"
                      />
                    </td>
                    <td>{brand.category}</td>
                    <td className="text-center">{brand.products.length}</td>
                    <td className="">
                        <div className="d-flex">
                      <Link
                        to={`update/${brand._id}`}
                        className={`btn ${dashStyle["dash-purple"]}`}
                      >
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className={``}
                        />
                      </Link>
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className="btn text-danger mt-1"
                        onClick={() => deleteBrand(brand._id)}
                      />
                      </div>
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

        <DashPagination
          totalPages={allBrandsInPage.totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default BrandsData;
