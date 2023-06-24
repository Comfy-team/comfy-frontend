import { useLayoutEffect, useState } from "react";
import { Outlet } from "react-router-dom";

// components
import NavAside from "../../components/dashboard/navAside";
import ToggleAsideBtn from "../../components/dashboard/toggleAsideBtn";

// style
import style from "./dashboard.module.css";

const Dashboard = () => {
  const [collapseAside, setCollapseAside] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth <= 991) {
        setIsSmallScreen(true);
        setCollapseAside(false);
      } else {
        setIsSmallScreen(false)
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [window.innerWidth]);

  const handleToggleAside = () => {
    setCollapseAside(!collapseAside);
  };

  return (
    <div id={style.dashboard} className="position-relative">
      <div className="d-flex flex-lg-row flex-column flex-wrap h-100">
        <div
          className={`${collapseAside ? "col-lg-1" : "col-lg-3"} ${
            style.col
          } px-0 pe-lg-3 position-relative`}
        >
          {!isSmallScreen && <ToggleAsideBtn onToggleAside={handleToggleAside} />}
          <NavAside isSmallScreen={isSmallScreen} collapsed={collapseAside} />
        </div>
        <div
          className={`${collapseAside ? "col-lg-11" : "col-lg-9"} ${
            style.col
          } ps-lg-0 px-3 py-3 flex-fill`}
        >
          <div
            className="bg-white h-100 rounded-3 py-3 container-fluid m-0"
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
