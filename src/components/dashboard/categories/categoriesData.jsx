import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit } from "@fortawesome/free-regular-svg-icons";
import axiosInstance from "../../../apis/config";
import DashPagination from "./../dashPagination";
import { showToast } from "../../../store/slices/toastSlice";
import dashStyle from "../../../pages/dashboard/dashboard.module.css";
import RemoveProductWarning from "../../common/removeProductWarning";
const CategoriesData = () => {
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const [totalCategories, setTotalCategories] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery === "") {
      // If search query is empty, show all categories
      axiosInstance
        .get(`/categories`, {
          params: {
            page: currentPage,
          },
        })
        .then((res) => {
          setDisplayedCategories(res.data.data);
          setAllCategories(res.data);
          setTotalCategories(res.data.totalCategories);
          setLoading(false);
          console.log(displayedCategories.totalPages)
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
      // If search query is empty, show all categories
      setDisplayedCategories(categories.slice(0, 10));
    } else {
      // If search query is not empty, filter the categories and show the results
      const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(query)
      );
      setDisplayedCategories(filteredCategories.slice(0, 10));
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
        console.log(response);
        // Remove the deleted category from the displayed categories
        setDisplayedCategories(
          displayedCategories.filter((category) => category._id !== id)
        );
        // decrement the total categories count
        setTotalCategories(totalCategories - 1);
        dispatch(showToast("Product was deleted successfully!"));
        setCategoryToDelete(null);
      })
      .catch((error) => {
        console.log("Error deleting category:", error);
      });
  }

  function onPageChange(page) {
    setCurrentPage(page);
  }

  return (
    <>
      <h4 className={`mb-2 py-3 ps-4 ${dashStyle["fw-bold"]}`}>
        Categories (total: {totalCategories})
      </h4>
      <div className="row ms-4 me-3">
        <div className="my-4 row d-flex align-items-center justify-content-between">
          <div className="col-6">
            <input
              className="form-control"
              type="search"
              placeholder="Search by id or name"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="col-6 d-flex justify-content-end">
            <button
              type="button"
              className={`btn text-capitalize ${dashStyle["dash-btn"]}`}
              onClick={handleAddCategory}
              value={searchQuery}
            >
              Add New Category
            </button>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table ">
          <thead>
            <tr>
              <th scope="col" className="text-truncate">
                #ID
              </th>
              <th scope="col">Name</th>
              <th scope="col">Products</th>
              <th scope="col">Image</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              displayedCategories.map((category) => (
                <tr key={category._id}>
                  <td>{category._id}</td>
                  <td>{category.name}</td>
                  <td className="ps-4">{category.products_id.length}</td>
                  <td>
                    <img
                      src={
                        process.env.REACT_APP_BASE_URL + "/" + category.image
                      }
                      alt={category.name}
                      className={`${dashStyle["categories-img"]}`}
                    />
                  </td>
                  <td>
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
                      // onClick={() => handleDeleteCategory(category._id)}
                      onClick={() => {
                        setCategoryToDelete(category);
                        setShowWarning(true);
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
       
      </div>

      <DashPagination
        currentPage={currentPage}
        totalPages={allCategories.totalPages}
        onPageChange={onPageChange}
      />
      {showWarning && categoryToDelete && (
        <RemoveProductWarning
          onRemove={() => handleDeleteCategory(categoryToDelete._id)}
          onCancel={() => {
            setShowWarning(false);
            setCategoryToDelete(null);
          }}
        />
      )}
    </>
  );
};

export default CategoriesData;
