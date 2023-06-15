import { Outlet } from "react-router-dom";

// components
import PageHeader from "../common/pageHeader";
const pages = { label: "example page", href: "/" };
const LayoutWithPageHeader = () => {
  return (
    <>
      <PageHeader pages={pages} />
      <Outlet />
    </>
  );
};

export default LayoutWithPageHeader;
