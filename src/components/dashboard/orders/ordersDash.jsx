import { Outlet } from "react-router-dom";

const OrdersDash = () => {
  return (
    <div>
      <h1>orders</h1>
      <Outlet />
    </div>
  );
};

export default OrdersDash;
