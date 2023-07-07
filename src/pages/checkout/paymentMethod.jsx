import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
// import { useEffect } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
//
import axiosInstance from "../../apis/config";
import { emptyCart } from "../../functions/cart";
import { showToast } from "../../store/slices/toastSlice.js";
//style
import style from "./checkout.module.css";
import "../../App.css";
import OrderInfo from "./../../components/checkout/orderInfo";
import Spinner from "../../components/common/spinner";
import RemoveProductWarning from "./../../components/common/removeProductWarning";
export default function PaymentMethod() {
  const [showWarning, setShowWarning] = useState(false);
  const [isAddingOrder, setIsAddingOrder] = useState(false);
  const [buttonText, setButtonText] = useState("Confirm order");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("userToken");
  const shippingValue = 15.0;
  // ===========
  const cart = useSelector(state => state.cart.cart);
  const formData = useSelector(state => state.CheckoutForm.form);
  // ===========
  const additionalInfo = {
    totalPrice: cart.totalPrice,
    items: cart.items,
    userId: cart.user_id,
  };
  const newObjectData = { ...formData, ...additionalInfo };
  const onConfirmClick = () => {
    setShowWarning(false);
    axiosInstance
      .post(`/orders`, newObjectData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
      .then(res => {
        dispatch(showToast("orders was make  successfully!"));
        setTimeout(() => {
          navigate(`/account/${cart.user_id}`);
        }, 4000);
        emptyCart(cart._id);
        setIsAddingOrder(true);
        setButtonText("order Done");
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  return formData ? (
    <div className="">
      <div className={`${style.PaymentMethod} ml-5 ml-md-3 container `}>
        <div className="container">
          <div className="form-control mr-5 ps-4">
            <OrderInfo formData={formData} />
          </div>
          <p className="mt-5 ms-1"> Shipping method</p>
          <div
            className={`${style.shippingMethod}   form-control active-input mb-5`}
          >
            <div className="row">
              <div className="col-4 "> standard</div>
              <div className="col-5"> </div>
              <div className="col-2"> ${shippingValue}</div>
            </div>
          </div>
          <div className="row mb-4  w-100 mx-auto  ">
            <Link
              to="/checkout"
              className={` col-lg-6  col-md-6 col-sm-12  col-12  mt-2 mb-3  mt-4 ${style.returnLink} text-decoration-none `}
            >
              {`<  `} return to information
            </Link>
            <button
              className={`${style.orderbtn} col-lg-6  col-md-6 col-sm-12  col-12  btn  h-100  ws-100 me-0 `}
              onClick={() => {
                setShowWarning(true);
              }}
              disabled={isAddingOrder}
            >
              {buttonText}
            </button>
          </div>
          <hr className="border" />
          <small className={`${style.gray} mt-2`}>
            {" "}
            All Rights Reserved to comfy team
          </small>
        </div>
      </div>

      {showWarning && (
        <RemoveProductWarning
          onRemove={() => {
            onConfirmClick();
            setIsAddingOrder(true);
          }}
          onCancel={() => {
            setShowWarning(false);
            setIsAddingOrder(false);
          }}
        />
      )}
    </div>
  ) : (
    <Spinner />
  );
}
