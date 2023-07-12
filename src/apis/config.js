import axios from "axios";
import jwt_decode from "jwt-decode";

// coomponents
import store from "../store/store";
import { setCart } from "../store/slices/cartSlice";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("userToken");
    if (token) {
      const currentTime = Date.now() / 1000;
      let decoded = jwt_decode(token);
      if (decoded.exp < currentTime) {
        localStorage.removeItem("userToken");
        store.dispatch(setCart({}));
        const requireAuth = /(checkout|dashboard|account|order-comfirmed)/g;
        if (requireAuth.test(window.location.pathname)) {
          window.location.replace(window.location.origin);
        }
      }
    } else {
      store.dispatch(setCart({}));
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
