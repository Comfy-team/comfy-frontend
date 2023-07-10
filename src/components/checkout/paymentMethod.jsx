import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
//
import axiosInstance from "../../apis/config";
import { emptyCart } from "../../functions/cart";
import { showToast } from "../../store/slices/toastSlice.js";

import OrderInfo from "./orderInfo";
import Spinner from "../common/spinner";
import ConfirmPopup from "../common/confirmPopup";
//style
import style from "../../pages/checkout/checkout.module.css";

export default function PaymentMethod() {
  const [showWarning, setShowWarning] = useState(false);
  const [showBtnSpinner, SetShowBtnSpinner] = useState(false);
  const [isAddingOrder, setIsAddingOrder] = useState(false);
  const [buttonText, setButtonText] = useState("Confirm order");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("userToken");
  const shippingValue = 15.0;
  // ===========
  const cart = useSelector(state => state.cart.cart);
  const formData = useSelector(state => state.CheckoutForm.form);
  // console.log(cart); // ===========

  const onConfirmClick = () => {
    SetShowBtnSpinner(true);
    setShowWarning(false);

    // Filter the cart items to include only those whose available stock is greater than or equal to the quantity in the cart
    const availableItems = cart?.items?.filter(item => {
      return (
        item?.product_id?.colors?.length > 0 &&
        item?.product_id?.colors[0]?.stock >= item?.quantity
      );
    });
    console.log("availableItems", availableItems);


    const additionalInfo = {
      address: formData?.address,
      phone: formData?.phone,
      totalPrice: cart?.totalPrice,
      userId: cart?.user_id,
      items: availableItems?.map(item => ({
        product_id: item?.product_id._id,
        quantity: item.quantity,
        color: item.color,
        price: item.product_id.price,
      })),
    };
    const newObjectData = {
      address: formData?.address,
      phone: formData?.phone,
      ...additionalInfo,
    };
    console.log("newObjectData", newObjectData);

    axiosInstance
      .post(`/orders`, newObjectData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
      .then(res => {
        console.log(res);
        dispatch(showToast("orders was make  successfully!"));
        setTimeout(() => {
          navigate(`/account/${cart.user_id}`);
        }, 4000);
        emptyCart(cart._id);
        setIsAddingOrder(true);
        SetShowBtnSpinner(false);

        // delete form data from localStorage
        localStorage.removeItem("localFormData");
        setButtonText("order Done");
      })
      .catch(error => {
        console.log(error.response);
        dispatch(showToast("Unable to make order, please try again."));
        SetShowBtnSpinner(false);
      });
  };
  return formData ? (
    <div className="">
      <div className={`${style.PaymentMethod}  container `}>
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
            {!showBtnSpinner ? (
              <button
                className={`${style.orderbtn} col-lg-6  col-md-6 col-sm-12  col-12  btn  h-100  ws-100 me-0 `}
                onClick={() => {
                  setShowWarning(true);
                }}
                disabled={isAddingOrder}
              >
                {buttonText}
              </button>
            ) : (
              <button
                className={`${style.orderbtn} col-lg-6  col-md-6 col-sm-12  col-12  btn  h-100  ws-100 me-0 `}
                onClick={() => {
                  setShowWarning(true);
                }}
                disabled={isAddingOrder}
              >
                {buttonText}
                <div className="spinner-border spinner-border-sm"></div>
              </button>
            )}{" "}
          </div>
          <hr className="border" />
          <small className={`${style.gray} mt-2`}>
            All Rights Reserved to comfy team
          </small>
        </div>
      </div>

      {showWarning && (
        <ConfirmPopup
          msg={"Are you sure you want to purchase?"}
          onConfirm={() => {
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
