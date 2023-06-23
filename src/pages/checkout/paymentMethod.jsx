import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "./../../apis/config";
import { emptyCart } from "../../functions/cart";
import style from "./checkout.module.css";
import "../../App.css";

export default function PaymentMethod({ formData, token }) {
  // console.log(cartSlice(true));
  const [orderinfo, setOrderinfo] = useState(formData);
  const [shippingvalue, setShippingvalue] = useState(20.0);
  const [isAddingOrder, setIsAddingOrder] = useState(false);
  const navigate = useNavigate();

  const cart = useSelector(state => state.cart.cart);
  const handleSubmit = orderinfo => {
    let theitems = cart.items;
    const allitemIds =
      theitems && theitems.length > 0
        ? theitems.map(item => ({
            product_id: item.product_id._id,
            color: item.color,
            price: item.price,
            quantity: item.quantity,
          }))
        : [];
    // console.log("allitemIds", allitemIds);

    const additionalinfo = {
      totalPrice: cart.totalPrice,
      items: cart.items,
      userId: cart.user_id,
    };
    const newobjectdata = { ...orderinfo, ...additionalinfo };
    // console.log("newobjectdata");
    // console.log(newobjectdata);
    axiosInstance
      .post(`/orders`, newobjectdata, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
      .then(res => {
        // console.log(res);
        // console.log("order Done ");
        setIsAddingOrder(true);
        setTimeout(() => {
          navigate("/shop");
        }, 2000);

        // store.dispatch(setCart(res.data));
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  return formData ? (
    <div>
      <div className={`${style.PaymentMethod} ml-5 ml-md-3 container `}>
        <div className="container">
          {/**=========================================== */}

          {/**=========================================== */}

          <div className="form-control mr-5">
            <div className={`${style.first} row mr-5`}>
              <div className={`${style.gray} col-3`}> Contact</div>
              <div className="col-6"> {formData.phone}</div>
              <div className="col-3">
                <Link to="/checkout/information "> change </Link>
              </div>
            </div>
            <hr className="border" />
            <div className={`${style.last} row `}>
              <div className={`${style.gray} col-3`}> Ship to</div>
              <div className="col-6">
                {" "}
                {formData.address.apartment} ,{formData.address.street},
                {formData.address.city},{formData.address.governorate},
                {formData.address.country}
              </div>
              <div className="col-3">
                <Link to="/checkout/information "> change </Link>
              </div>{" "}
            </div>
          </div>
          <h3 className="mt-5"> Shipping method</h3>
          <div className={`${style.blue} form-control active-input mb-5`}>
            <div className="row">
              <div className="col-4"> standard</div>
              <div className="col-5"> </div>
              <div className="col-2"> ${shippingvalue}</div>
            </div>
          </div>
          <div className="row mb-5  w-100 m-auto">
            <Link
              className="text-decoration-none col-6  col-md-5 mt-2"
              onClick={() => window.history.go(-1)}
            >
              {" "}
              {`<  `} return to information{" "}
            </Link>
            <div className="col-1 col-md-4"></div>
            <div className={`col-5 col-md-3 mr-5 `}>
              <button
                className={`${style.orderbtn}  btn btn-primary `}
                onClick={event => {
                  handleSubmit(orderinfo);
                  setIsAddingOrder(true);
                  emptyCart(cart._id);

                  event.target.textContent = "order Done ";
                }}
                disabled={isAddingOrder}
              >
                Confirm order
              </button>
            </div>
          </div>
          <hr className="border" />
          <p className={`${style.gray}`}> All Rights Reserved to comfy team</p>
        </div>
      </div>
    </div>
  ) : (
    "loading"
  );
}
