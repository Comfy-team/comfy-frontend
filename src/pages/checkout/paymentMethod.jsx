import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import style from "./checkout.module.css";
import "../../App.css";
import axiosInstance from "./../../apis/config";
import jwtDecode from "jwt-decode";

export default function PaymentMethod({ data }) {
  // console.log(cartSlice(true));
  console.log("data---------", data);
  // console.log("data---", data.address.apartment);
  // const shippingvalue = 20.0;
  const [orderinfo, setOrderinfo] = useState(data);
  const [shippingvalue, setShippingvalue] = useState(20.0);

  console.log("Rendering PaymentMethod...");
  // rest of the component code

  const handleSubmit = orderinfo => {
    const token = localStorage.getItem("userToken");

    if (token) {
      let decodedtoken = jwtDecode(localStorage.getItem("userToken"));
      let { id, email, role } = decodedtoken;
      console.log(token);
      console.log(id);
      axiosInstance
        .get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        })
        .then(res => {
          let cartId = res.data.cart_id;
          console.log(cartId);
          const additionalinfo = { cartId: cartId, userId: id };
          const newobjectdata = { ...orderinfo, ...additionalinfo };
          console.log(newobjectdata);
          axiosInstance
            .post(`/orders`, newobjectdata, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "x-access-token": token,
              },
            })
            .then(res => {
              console.log(res);
              console.log("res");
              // store.dispatch(setCart(res.data));
            })
            .catch(error => console.log(error.response));
        })
        .catch(error => console.log(error));
    }
  };
  return data ? (
    <div>
      <div className={`${style.PaymentMethod} ml-5 ml-md-3 container `}>
        <div className="container">
          <div className="form-control mr-5">
            <div className={`${style.first} row mr-5`}>
              <div className={`${style.gray} col-3`}> Contact</div>
              <div className="col-6"> {data.phone}</div>
              <div className="col-3">
                <Link to="/checkout/information "> change </Link>
              </div>
            </div>
            <hr className="border" />
            <div className={`${style.last} row `}>
              <div className={`${style.gray} col-3`}> Ship to</div>
              <div className="col-6">
                {" "}
                {data.address.apartment} ,{data.address.street},
                {data.address.city},{data.address.governorate},
                {data.address.country}
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

            <div
              onClick={event => {
                handleSubmit(orderinfo);
                event.target.disabled = true;
                event.target.style.backgroundColor = "green";
                event.target.style.borderColor = "green";
                event.target.style.color = "white";
                event.target.textContent = "order Done ";
                // event.target.style.cursor = "not-allowed";
              }}
              className={`${style.orderbtn}  btn btn-primary col-5 col-md-3 mr-5 `}
            >
              Confirm order
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
