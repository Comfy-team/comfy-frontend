// components
import axiosInstance from "../apis/config";
import { setCart } from "../store/slices/cartSlice";
import store from "../store/store";

export const deleteItemFromCart = (cartId, id) => {
  const token = localStorage.getItem("userToken");
  axiosInstance
    .patch(
      `/cart/${cartId}/delete`,
      { itemId: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        store.dispatch(setCart(res.data));
      }
    })
    .catch((error) => console.log(error));
};

export const updateItemQuantity = ( cartId, id, quantity ) => {
  const token = localStorage.getItem("userToken");
  axiosInstance
    .patch(
      `/cart/${cartId}/update`,
      { itemId: id, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        store.dispatch(setCart(res.data));
      }
    })
    .catch((error) => console.log(error));
};

export const addItemToCart = (cartId, id, color, price) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    axiosInstance
      .post(
        `/cart/${cartId}`,
        { product_id: id, color, price },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          store.dispatch(setCart(res.data));
        }
      })
      .catch((error) => console.log(error));
  }
};
