import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// components
import AppRoutes from "./router/AppRoutes";
import axiosInstance from "./apis/config";
import { setBrands } from "./store/slices/brandsSlice";
import { getCart } from "./functions/cart";
import ToastInfo from "./components/common/toast";
import { showToast } from "./store/slices/toastSlice";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// main style
import "./App.css";
import TransitionToTop from "./components/common/transitionToTop";

function App() {
  const toastMsg = useSelector((state) => state.toastInfo.msg);
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance
      .get("/brands")
      .then((res) => {
        dispatch(setBrands(res.data.allData));
      })
      .catch((error) => console.log(error));

    const token = localStorage.getItem("userToken");
    if (token) getCart(token);
  }, []);

  return (
    <BrowserRouter>
      <TransitionToTop />
      <AppRoutes />
      {toastMsg && (
        <ToastInfo
          msg={toastMsg}
          show={toastMsg ? true : false}
          onDismissToast={() => dispatch(showToast(""))}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
