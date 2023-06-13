import { Outlet } from "react-router-dom";

// components
import PageHeader from "../common/pageHeader";

const LayoutWithPageHeader = () => {
  return (
    <>
      <PageHeader />
      <Outlet />
    </>
  );
};

export default LayoutWithPageHeader;
