import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// main style
import "./App.css";

// components
import AppRoutes from "./router/AppRoutes";
import axiosInstance from "./apis/config";
import { setBrands } from "./store/slices/brandsSlice";
import { setCart } from "./store/slices/cartSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance
      .get("/brands")
      .then((res) => {
        dispatch(setBrands(res.data));
      })
      .catch((error) => console.log(error));

    const token = localStorage.getItem("userToken");
    if (token) {
      let decoded = jwt_decode(token);
      axiosInstance
        .get(`/users/${decoded.id}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-access-token": token,
          },
        })
        .then((res) => dispatch(setCart(res.data)))
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
