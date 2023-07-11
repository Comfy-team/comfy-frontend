import { useEffect, useLayoutEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import jwt_decode from "jwt-decode";

// components
import NavAside from "../../components/dashboard/navAside";

// style
import style from "./dashboard.module.css";
import Spinner from "../../components/common/spinner";

const Dashboard = () => {
  const [collapseAside, setCollapseAside] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();

  const handleToggleAside = () => {
    setCollapseAside(!collapseAside);
  };

  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth <= 991) {
        setIsSmallScreen(true);
        setCollapseAside(false);
      } else {
        setIsSmallScreen(false);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [window.innerWidth]);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/404", { replace: true });
      return;
    }
    let decoded = jwt_decode(token);
    if (decoded.role !== "admin") {
      navigate("/404", { replace: true });
    } else {
      setIsAdmin(true);
    }
  }, [cart]);

  return isAdmin ? (
    <div id={style.dashboard} className="position-relative">
      <div className="d-lg-flex flex-lg-row h-100">
        <div
          className={`${collapseAside ? "col-lg-1" : "col-lg-3"} ${
            style.col
          } px-0 pe-lg-3 position-relative`}
        >
          <NavAside
            isSmallScreen={isSmallScreen}
            collapsed={collapseAside}
            onToggleAside={handleToggleAside}
          />
        </div>
        <div
          className={`${collapseAside ? "col-lg-11" : "col-lg-9"} ${
            style.col
          } ps-lg-0 px-3 py-3 flex-fill`}
        >
          <div className="bg-white h-100 rounded-3 p-0 container-fluid m-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default Dashboard;
