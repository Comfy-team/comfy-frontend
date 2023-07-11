import jwt_decode from "jwt-decode";

// components
import axiosInstance from "../apis/config";
import store from "../store/store";
import { setCart } from "../store/slices/cartSlice";
import { showLoginModal } from "../store/slices/loginModalSlice";

export const getCart = (token) => {
  let decoded = jwt_decode(token);
  if (decoded.role === "admin") {
    store.dispatch(setCart({ role: "admin" }));
    return;
  }
  axiosInstance
    .get(`/users/${decoded.id}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-access-token": token,
      },
    })
    .then((res) => {
      store.dispatch(setCart({ ...res.data, role: "user" }));
    })
    .catch((error) => console.log(error));
};

export const addItemToCart = (cartId, id, color) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    axiosInstance
      .post(
        `/cart/${cartId}`,
        { product_id: id, color },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      )
      .then((res) => {
        getCart(token);
      })
      .catch((error) => console.log(error));
  } else {
    store.dispatch(showLoginModal(true));
  }
};

export const updateItemQuantity = (cartId, id, quantity, color) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    axiosInstance
      .patch(
        `/cart/${cartId}/update`,
        { itemId: id, quantity, color },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      )
      .then((res) => {
        store.dispatch(setCart({ ...res.data, role: "user" }));
      })
      .catch((error) => console.log(error));
  } else {
    store.dispatch(showLoginModal(true));
  }
};

export const deleteItemFromCart = (cartId, id, color) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    return axiosInstance
      .patch(
        `/cart/${cartId}/delete`,
        { itemId: id, color },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      )
      .then((res) => {
        store.dispatch(setCart({ ...res.data, role: "user" }));
      })
      .catch((error) => console.log(error));
  } else {
    store.dispatch(showLoginModal(true));
  }
};

export const emptyCart = (cartId) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    axiosInstance
      .patch(
        `/cart/${cartId}/empty`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      )
      .then((res) => {
        store.dispatch(setCart({ ...res.data, role: "user" }));
      })
      .catch((error) => console.log(error));
  } else {
    store.dispatch(showLoginModal(true));
  }
};