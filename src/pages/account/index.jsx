import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import jwtDecode from "jwt-decode";

// components
import AccountInfo from "./../../components/account/accountInfo";
import ChangePasswords from "./../../components/account/changePassword";
import AccountOrders from "./../../components/account/accountOrders";
import { showLoginModal } from "../../store/slices/loginModalSlice";
import axiosInstance from "./../../apis/config";
import Spinner from "../../components/common/spinner";

// style
import style from "./account.module.css";

const Account = () => {
  const [notAuth, setNotAuth] = useState(true);
  const [showSpinner, setShowSpinner] = useState(true);
  const [user, setUser] = useState({});
  const [activeTitle, setActiveTitle] = useState("myOrder");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams({
    active: "myOrder",
  });

  let token = localStorage.getItem("userToken");

  const handleAccountInfoClick = () => {
    setActiveTitle("accountInfo");
    setSearchParams({ active: "accountInfo" });
  };

  const handleChangePasswordClick = () => {
    setActiveTitle("changePassword");
    setSearchParams({ active: "changePassword" });
  };

  const handleMyOrderClick = () => {
    setActiveTitle("myOrder");
    setSearchParams({ active: "myOrder" });
  };
  function handelLogout() {
    localStorage.removeItem("userToken");
    navigate("/");
  }

  useEffect(() => {
    if (!token) {
      setNotAuth(true);
      navigate("/");
      dispatch(showLoginModal(true));
    } else {
      setNotAuth(false);
    }
  }, []);

  useEffect(() => {
    if(!token){
      return;
    }
    setShowSpinner(true);
    if (jwtDecode(token).role === "admin") {
      navigate("/dashboard");
    } else if(id && jwtDecode(token).id === id)
      {
      axiosInstance
        .get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-access-token": token,
          },
        })
        .then((res) => {
          if (searchParams.get("active")) {
            setActiveTitle(searchParams.get("active"));
          }
          setUser(res.data);
          setShowSpinner(false);
        })
        .catch((err) => {
          console.log(err);
        });
      }else{
        navigate("/404",{replace:true})
        return;
      }
  }, []);

  return !notAuth ? (
    <div id={`${style.account}`}>
      {!showSpinner ? (
        <div className="container">
          <div className="d-flex justify-content-between align-items-center col-12 col-lg-7">
            <h1>Account</h1>
            <button
              className={`text-danger btn btn-md mb-2`}
              onClick={handelLogout}
            >
              Logout
            </button>
          </div>
          <p className="h5 mt-2 mt-md-0">
            <span>{user.fullName}</span>,{" "}
            <span className="text-secondary">{user.email}</span>
          </p>
          <hr
            className={`${style["mt-10"]} row col-12 col-lg-7 ${style["border-ms"]}`}
          />
          <div
            className={`d-flex overflow-x-auto ${style.hiddenScrollbar} align-items-center ${style.titleContainer}`}
          >
            <div className="col-5 col-sm-4 col-lg-2">
              <div
                className={`mx-auto mx-sm-0 ${style["title"]}
            ${activeTitle === "myOrder" ? style.active : ""}`}
                onClick={handleMyOrderClick}
              >
                <h6>My Order</h6>
              </div>
            </div>
            <div className="col-5 col-sm-4 col-lg-2">
              <div
                className={`mx-auto mx-sm-0 ${style["title"]}
             ${activeTitle === "accountInfo" ? style.active : ""}`}
                onClick={handleAccountInfoClick}
              >
                <h6>Account info</h6>
              </div>
            </div>
            <div className="col-6 col-sm-4 col-lg-2">
              <div
                className={`mx-auto mx-sm-0 ${style["title"]} 
             ${activeTitle === "changePassword" ? style.active : ""}`}
                onClick={handleChangePasswordClick}
              >
                <h6 className="text-center text-sm-start">Change password</h6>
              </div>
            </div>
          </div>
          <hr className={`row col-12 col-lg-7 ${style["border-ms"]}`} />

          <div className={`${style.acountPage}`}>
            {activeTitle === "myOrder" && (
              <AccountOrders user={user} token={token} />
            )}

            {activeTitle === "accountInfo" && (
              <AccountInfo user={user} setUser={setUser} token={token} />
            )}
            {activeTitle === "changePassword" && (
              <ChangePasswords user={user} token={token} />
            )}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  ) : (
    "wait"
  );
};

export default Account;
