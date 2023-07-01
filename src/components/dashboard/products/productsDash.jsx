import { Outlet } from "react-router-dom";

const ProductsDash = () => {
  return (
    <div className="py-4">
      <Outlet />
    </div>
  );
};

export default ProductsDash;
