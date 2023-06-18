import { Outlet, useLocation } from "react-router-dom";

// components
import PageHeader from "../common/pageHeader";

const LayoutWithPageHeader = () => {
  const location = useLocation();
  return (
    <>
      <PageHeader path={location.pathname.slice(1)} />
      <Outlet />
    </>
  );
};

export default LayoutWithPageHeader;
