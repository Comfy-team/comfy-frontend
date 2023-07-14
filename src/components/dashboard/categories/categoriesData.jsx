import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// components
import axiosInstance from "../../../apis/config";
import DashPagination from "./../dashPagination";
import { showToast } from "../../../store/slices/toastSlice";
import ConfirmPopup from "../../common/confirmPopup";
import Spinner from "../../common/spinner";

//style
import dashStyle from "../../../pages/dashboard/dashboard.module.css";

const CategoriesData = () => {
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const [totalCategories, setTotalCategories] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);

  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery === "") {
      axiosInstance
        .get(`/categories`, {
          params: {
            page: currentPage,
          },
        })
        .then((res) => {
          setShowSpinner(false);
          setDisplayedCategories(res.data.data);
          setAllCategories(res.data);
          setTotalCategories(res.data.totalCategories);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // If search query is not empty, fetch search results
      axiosInstance
        .get(`/categories/search`, {
          params: {
            search: searchQuery,
            page: currentPage,
          },
        })
        .then((res) => {
          setDisplayedCategories(res.data.data);
          setAllCategories(res.data);
          setTotalCategories(res.data.totalCategories);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentPage, searchQuery]);

  function handleSearch(event) {
    const query = event.target.value.trim().toLowerCase();
    setCurrentPage(1);
    setSearchQuery(query);
    if (query === "") {
      setDisplayedCategories(allCategories);
    } else {
      setDisplayedCategories(allCategories);
    }
  }

  function handleAddCategory(newCategory) {
    setCategories([...categories, newCategory]); // update categories state
    navigate("/dashboard/categories/add");
  }

  function handleUpdateCategory(id) {
    navigate(`/dashboard/categories/update/${id}`);
  }

  function handleDeleteCategory(id) {
    axiosInstance
      .delete("/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        data: {
          id: id,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(showToast("Category was deleted successfully!"));
          setDisplayedCategories(
            displayedCategories.filter((category) => category._id !== id)
          );
          setTotalCategories(totalCategories - 1);
          setCategoryToDelete(null);
        } else {
          dispatch(
            showToast("Failed to delete Category! Please try again later!")
          );
        }
      })
      .catch((error) => {
        console.log("Error deleting category:", error);
      });
  }

  function onPageChange(page) {
    setCurrentPage(page);
  }

  return (
    <div className="py-4">
      <h1 className={`mb-2 py-3 ps-4 fs-4 ${dashStyle["fw-bold"]}`}>
        Categories (total: {totalCategories})
      </h1>
      <div className="row ms-4 me-3">
        <div className="my-4 row d-flex flex-column-reverse flex-md-row  align-items-center justify-content-between">
          <div className="col-12 col-md-6">
            <input
              className="form-control"
              type="search"
              placeholder="Search by id or name"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="col-10 col-md-6 d-flex justify-content-center justify-content-md-end  mb-5 mb-md-0">
            <button
              type="button"
              className={`btn text-capitalize ${dashStyle["dash-btn"]}`}
              onClick={handleAddCategory}
              value={searchQuery}
            >
              <FontAwesomeIcon icon={faPlus} /> Add New Category
            </button>
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
                  <th scope="col">Products</th>
                  <th scope="col">Image</th>
                  <th scope="col" className="text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedCategories.length > 0 ? (
                  displayedCategories.map((category) => (
                    <tr key={category._id}>
                      <td className="ps-4">{category._id}</td>
                      <td>{category.name}</td>
                      <td className={`${dashStyle.categoryProduct}`}>
                        {category.products_id.length}
                      </td>
                      <td>
                        <img
                          src={
                            process.env.REACT_APP_BASE_URL +
                            "/" +
                            category.image
                          }
                          alt={category.name}
                          className={`${dashStyle["categories-img"]}`}
                        />
                      </td>
                      <td className="text-center">
                        <FontAwesomeIcon
                          icon={faEdit}
                          type="button"
                          className={`btn p-0 ${dashStyle["dash-purple"]}`}
                          onClick={() => handleUpdateCategory(category._id)}
                        />
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          type="button"
                          className="btn text-danger p-0 ms-2"
                          onClick={() => {
                            setCategoryToDelete(category);
                            setShowWarning(true);
                          }}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No category found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <DashPagination
            currentPage={currentPage}
            totalPages={allCategories.totalPages}
            onPageChange={onPageChange}
          />
        </>
      ) : (
        <Spinner />
      )}
      {showWarning && categoryToDelete && (
        <ConfirmPopup
          msg={`Are you sure you want to delete ${categoryToDelete.name} from categories?`}
          onConfirm={() => handleDeleteCategory(categoryToDelete._id)}
          onCancel={() => {
            setShowWarning(false);
            setCategoryToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default CategoriesData;
