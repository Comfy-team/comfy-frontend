import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import AccountInfo from "./../../components/account/accountInfo";
import ChangePasswords from "./../../components/account/changePassword";
import AccountOrders from "./../../components/account/accountOrders";
import { showLoginModal } from "../../store/slices/loginModalSlice";

import axiosInstance from "./../../apis/config";
import style from "./account.module.css";
import jwtDecode from "jwt-decode";

const Account = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let token = localStorage.getItem("userToken");
  const [notAuth, setNotAuth] = useState(true);

  const [user, setUser] = useState({});
  const [activeTitle, setActiveTitle] = useState("myOrder");
  const [activeComponent, setActiveComponent] = useState(
    <AccountOrders user={user} token={token} />
  );

  const handleAccountInfoClick = () => {
    setActiveTitle("accountInfo");
    setActiveComponent(<AccountInfo user={user} token={token} />);
  };

  const handleChangePasswordClick = () => {
    setActiveTitle("changePassword");
    setActiveComponent(<ChangePasswords user={user} token={token} />);
  };

  const handleMyOrderClick = () => {
    setActiveTitle("myOrder");
    setActiveComponent(<AccountOrders user={user} token={token} />);
  };

  
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      setNotAuth(true);

      navigate("/");
      dispatch(showLoginModal(true));
    } else {
      setNotAuth(false);
    }
  }, [token]);

  useEffect(() => {
    if(jwtDecode(token).role === "admin"){
      navigate("/dashboard");
    }else{
    axiosInstance
      .get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-access-token": token,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
    }
  }, []);
  function handelLogout() {
    localStorage.removeItem("userToken");
    navigate("/");
  }

  return !notAuth ? (
    <div id={`${style.account}`} style={{}}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center col-12 col-lg-7">
          <h1>Account</h1>
          <button className={`text-danger btn btn-md`} onClick={handelLogout}>
            Logout
          </button>
        </div>

        <p className="h5">
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
              <h6 className={`mr-2 mr-sm-0 ms-sm-1`}>Account info</h6>
            </div>
          </div>
          <div className="col-5 col-sm-4 col-lg-2">
            <div
              className={`mx-auto mx-sm-0 ${style["title"]} 
             ${activeTitle === "changePassword" ? style.active : ""}`}
              onClick={handleChangePasswordClick}
            >
              <h6 className="text-center text-sm-start ">Change password</h6>
            </div>
          </div>
        </div>
        <hr className={`row col-12 col-lg-7 ${style["border-ms"]}`} />

        <div className={`${style.acountPage}`}>
          {activeTitle === "myOrder" && (
            <AccountOrders user={user} token={token} />
          )}

          {activeTitle === "accountInfo" && (
            <AccountInfo user={user} token={token} />
          )}
          {activeTitle === "changePassword" && (
            <ChangePasswords user={user} token={token} />
          )}
        </div>
      </div>
    </div>
  ) : (
    "wait"
  );
};

export default Account;
