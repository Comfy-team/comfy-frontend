import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

// components
import DashPagination from "./dashPagination";
import { showToast } from "../../store/slices/toastSlice";
import ConfirmPopup from "../common/confirmPopup";
import axiosInstance from "../../apis/config";
import Spinner from "../common/spinner";

// style
import dashStyle from "./../../pages/dashboard/dashboard.module.css";

const UsersDash = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [allUsersInPage, setAllUsersInPage] = useState([]);
  const [totalUsers, setTotaUsers] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const [displayId, setDisplayId] = useState(false);
  const [displayEmail, setDisplayEmail] = useState(false);
  const token = localStorage.getItem("userToken");
  const dispatch = useDispatch();

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
          setTotaUsers(res.data.totalUsers);
          setShowSpinner(false);
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
          setTotaUsers(res.data.totalUsers);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentPage, searchQuery]);

  // delete user
  function deleteUser(id) {
    setShowWarning(false);

    axiosInstance
      .delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-access-token": token,
        },
      })
      .then((res) => {
        dispatch(showToast("User was deleted successfully!"));
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
            setTotaUsers(res.data.totalUsers);
            setUserIdToDelete("");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        showToast("Failed to delete user! Please try again later!");
      });
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

  // expand object id
  function showAllId(event) {
    const id = event.currentTarget.dataset.id;
    if (displayId) {
      event.currentTarget.textContent = id.substring(0, 6) + "...";
    } else {
      event.currentTarget.textContent = id;
    }
    setDisplayId((prevDisplayId) => !prevDisplayId);
  }

  // expand email 
  function showAllEmail(event,userEmail) {
    const email = userEmail;
    if(displayEmail){
      event.currentTarget.textContent = hideEmail(email);
    }else{
      event.currentTarget.textContent = email;

    }
    setDisplayEmail((prevDisplayEmail) => !prevDisplayEmail);
  }

  // hide form the first part of the email and expand the rest of the email (domain)
  function hideEmail(email) {
    const parts = email.split("@");
    const username = parts[0];
    const domain = parts[1];
    const firstPart = username.substring(0, username.length / 2);
    const ellipsis = "...";
    return `${firstPart}${ellipsis}@${domain}`;
  }

  return (
    <div className={`py-4`}>
      <h1 className={`mb-2 h4 py-3 ps-4 ${dashStyle["fw-bold"]}`}>
        Users (total: {totalUsers})
      </h1>

      <div className="overflow-x-auto">
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
        {!showSpinner ? (
          <>
            <div className="table-responsive mb-5">
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
                    <th scope="col" className="text-center">
                      City
                    </th>
                    <th scope="col">Orders</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.length > 0 ? (
                    allUsers.map((user) => {
                      return (
                        <tr key={user._id}>
                          <th
                            className={`ps-4  ${dashStyle["dash-prod-id-holder"]}`}
                            data-id={user._id}
                            onClick={showAllId}
                          >
                            <span
                              className={`d-block ${dashStyle["dash-prod-id"]}`}
                            >
                              {user._id}
                            </span>
                          </th>

                          <td>{user.fullName}</td>
                          <td
                            onClick={(e) => showAllEmail(e,user.email)}
                            style={{ cursor: "pointer" }}
                          >
                             {hideEmail(user.email)}
                            {/* {user.email} */}
                          </td>
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
                              onClick={() => {
                                setUserIdToDelete(user._id);
                                setShowWarning(true);
                              }}
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
            </div>

            <DashPagination
              totalPages={allUsersInPage.totalPages}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </>
        ) : (
          <Spinner />
        )}

        {showWarning && userIdToDelete && (
          <ConfirmPopup
            msg={"Are you sure you want to delete user?"}
            onConfirm={() => deleteUser(userIdToDelete)}
            onCancel={() => {
              setShowWarning(false);
              setUserIdToDelete("");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default UsersDash;
