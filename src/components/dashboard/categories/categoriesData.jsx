import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit } from "@fortawesome/free-regular-svg-icons";
import axiosInstance from "../../../apis/config";
import DashPagination from "./../dashPagination";
import dashStyle from "../../../pages/dashboard/dashboard.module.css";

const CategoriesData = () => {
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const [totalCategories, setTotalCategories] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        let response;
        if (searchQuery === "") {
          // If search query is empty, show all categories
          response = await axiosInstance.get(`/categories`, {
            params: {
              page: currentPage,
            },
          });
        } else {
          // If search query is not empty, fetch search results
          response = await axiosInstance.get(`/categories/search`, {
            params: {
              search: searchQuery,
              page: currentPage,
            },
          });
        }
        console.log("Categories fetched successfully:", response.data);
        setDisplayedCategories(response.data.data);
        setAllCategories(response.data.data);
        setTotalCategories(response.data.totalCategories);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching categories:", error);
        setLoading(false);
      }
    }
    fetchData();
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
      console.log("Filtered categories:", filteredCategories);
      setDisplayedCategories(filteredCategories.slice(0, 10));
    }
  }

  function handleAddCategory(newCategory) {
    setCategories([...categories, newCategory]); // update categories state
    navigate("/dashboard/categories/add");
    console.log("Add category button clicked");
  }

  function handleUpdateCategory(id) {
    navigate(`/dashboard/categories/update/${id}`);
  }

  function handleDeleteCategory(id) {
    axiosInstance
      .delete("/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          id: id,
        },
      })
      .then((response) => {
        console.log("Category deleted successfully:", response.data);
        // Remove the deleted category from the displayed categories
        setDisplayedCategories(
          displayedCategories.filter((category) => category._id !== id)
        );
        // decrement the total categories count
        setTotalCategories(totalCategories - 1);
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

                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <DashPagination
        totalPages={allCategories.totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default CategoriesData;
