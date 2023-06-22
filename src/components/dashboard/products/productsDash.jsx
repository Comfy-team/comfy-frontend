import { Outlet } from "react-router-dom";

const ProductsDash = () => {
  return (
    <div>
      <h1>products</h1>
      <Outlet />
    </div>
  );
};

export default ProductsDash;
