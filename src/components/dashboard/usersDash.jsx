import { useState } from "react";
import { useEffect } from "react";

// component
import DashPagination from "./dashPagination";

//icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

//style
import dashStyle from "./../../pages/dashboard/dashboard.module.css";
import axiosInstance from "../../apis/config";

const UsersDash = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [allUsersInPage, setAllUsersInPage] = useState([]);
  const [totalUsers, setTotaUsers] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteStatus, setDeleteStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const token = localStorage.getItem("userToken");
  useEffect(() => {
    if (searchQuery === "") {
        // If search query is empty, show all users
      axiosInstance
        .get(`/users`, {
          params: {
            page: currentPage,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "x-access-token": token,
          },
        })
        .then((res) => {
          setAllUsersInPage(res.data);
          setAllUsers(res.data.data);
          setTotaUsers(res.data.totalUsers)
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // If search query is not empty, fetch search results
      axiosInstance
        .get(`/users/search`, {
          params: {
            search: searchQuery,
            page: currentPage,
          },
        })
        .then((res) => {
          setAllUsersInPage(res.data);
          setAllUsers(res.data.data);
          setTotaUsers(res.data.totalUsers)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentPage, searchQuery]);

  // delete user
  function deleteUser(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      axiosInstance
        .delete(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-access-token": token,
          },
        })
        .then((res) => {
          setDeleteStatus(`User ${id} deleted successfully.`);
          axiosInstance.get(`/users`, {
            params: {
              page: currentPage,
            },
            headers: {
              Authorization: `Bearer ${token}`,
              "x-access-token": token,
            },
          })
          .then((res) => {
            setAllUsersInPage(res.data);
            setAllUsers(res.data.data);
            setTotaUsers(res.data.totalUsers)
          })
          .catch((err) => {
            console.log(err);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  // expand object id
  function showAllId(event) {
    const id = event.currentTarget.dataset.id;
    event.currentTarget.textContent = id;
  }
  // Update current page state when page number is clicked
  function onPageChange(page) {
    setCurrentPage(page);
  }

  // search for id or email
  function handleSearch(event) {
    const query = event.target.value.trim().toLowerCase();
    setCurrentPage(1);
    setSearchQuery(query);
    if (query === "") {
      // If search query is empty, show all users
      setAllUsersInPage(allUsers);
    } else {
      // If search query is not empty, fetch search results
      setAllUsersInPage(allUsers);
    }
  }
  return (
    <div className={`py-4`}>
      <h4 className={`mb-2 py-3 ps-4 ${dashStyle["fw-bold"]}`}>
        Users (total: {totalUsers})
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

      <div className="overflow-x-auto pb-3">
        <div className="row ms-4 me-3">
          <div className="my-4 col-12 col-md-6 d-flex align-items-center justify-content-start ">
            <input
              className="form-control"
              type="search"
              placeholder="Search by user id or email address"
              aria-controls="DataTables_Table_0"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        <table className="table border-top" id="DataTables_Table_0">
          <thead>
            <tr>
              <th scope="col" className="ps-4">
                #ID
              </th>
              <th scope="col">FullName</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Governorate</th>
              <th scope="col">City</th>
              <th scope="col">Orders</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.length > 0 ? (
              allUsers.map((user) => {
                return (
                  <tr key={user._id}>
                    <td
                      className={`ps-4`}
                      data-id={user._id}
                      onClick={showAllId}
                    >
                      {user._id.substring(0, 8) + "..."}
                    </td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td
                      className={
                        user.phone !== "" ? "text-start" : "text-center"
                      }
                    >
                      {user.phone !== "" ? user.phone : "x"}
                    </td>
                    <td className="text-center">
                      {user.address.governorate !== ""
                        ? user.address.governorate
                        : "x"}
                    </td>
                    <td className="text-center">
                      {user.address.city !== "" ? user.address.city : "x"}
                    </td>
                    <td className="text-center">{user.order.length}</td>
                    <td className="text-center">
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        type="button"
                        onClick={() => deleteUser(user._id)}
                        className="text-danger"
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <DashPagination
          totalPages={allUsersInPage.totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default UsersDash;
