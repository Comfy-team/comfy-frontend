import { Outlet } from "react-router-dom";

// components
import Header from "../common/header";
import Footer from "../common/footer";

const LayoutWithNav = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutWithNav;
