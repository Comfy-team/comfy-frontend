import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

// components
import AppRoutes from "./router/AppRoutes";
import axiosInstance from "./apis/config";
import { setBrands } from "./store/slices/brandsSlice";
import { getCart } from "./functions/cart";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// main style
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance
      .get("/brands")
      .then((res) => {
        dispatch(setBrands(res.data.data));
      })
      .catch((error) => console.log(error));

    const token = localStorage.getItem("userToken");
    if (token) getCart(token);
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;