import React, { useState, useEffect } from "react";
import style from "./checkout.module.css";
import { useSelector } from "react-redux";

export default function ShoppingCardComponent() {
  let [theitems, SetItems] = useState([]);

  const cart = useSelector(state => state.cart.cart);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        SetItems(cart.items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartItems();
  }, [cart]);
  const shipping = 15;
  const priceWithShapping = cart.totalPrice + shipping;

  return (
    <div>
      {" "}
      <div className="ps-4 pt-2">
        {theitems && theitems.length > 0 ? (
          <div className="container ">
            {theitems.map((item, index) => (
              <div
                key={index}
                className={`${style.imgcontainer} row mb-2 p-0 m-0`}
              >
                <img
                  className={`${style.productImg}  col-2`}
                  alt={item.name}
                  src={`${
                    process.env.REACT_APP_BASE_URL +
                    "/" +
                    item?.product_id?.images[0]?.src
                  }`}
                />

                <div className={`${style.productInfo} col-8  `}>
                  <p className="mb-0 ml-3">{item.product_id.name}</p>
                  <div className={`${style.quantitCircle} mb-1"`}>
                    {item.quantity}
                  </div>

                  <div
                    key={index}
                    className={`${style.spanColor} `}
                    style={{ backgroundColor: `${item.color}` }}
                  ></div>
                </div>
                <div className="col-2 mt-3  ">
                  <p className="mb"> ${item.quantity * item.price}</p>
                </div>
              </div>
            ))}

            <div className={`${style.Subtotal} mb-1 row mt-5`}>
              <div className="col-2 ">Subtotal</div>
              <div className="col-7"></div>
              <div className="col-2">
                <p>${cart.totalPrice}</p>
              </div>
            </div>
            <div className={`${style.Shipping}  mb-1 row`}>
              <div className="col-4">Shipping</div>
              <div className="col-5"></div>
              <div className="col-3 ">
                <p className="">${shipping}</p>
              </div>
            </div>
            <hr className="hr" />
            <div className="mb-1 row">
              <div className="col-4 fs-5">Total</div>
              <div className="col-4"></div>
              <div className="col-4">
                <p className=" fs-5">
                  <span className={`${style.currency}`}> USD</span>$
                  {priceWithShapping}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}{" "}
      </div>
    </div>
  );
}
