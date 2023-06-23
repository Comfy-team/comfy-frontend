import React, { useState, useEffect } from "react";
import style from "./checkout.module.css";
import { useSelector } from "react-redux";

export default function ShoppingCardComponent({ cartdatafunc }) {
  let [thetotalprice, SetTotalprice] = useState(0);
  let [theitems, SetItems] = useState([]);
  let [itemsfeomcard, Setitemsfeomcard] = useState([]);

  const cart = useSelector(state => state.cart.cart);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        SetTotalprice(cart.totalPrice);
        SetItems(cart.items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartItems();
  }, [cart]);
  const shipping = 15;
  const priceWithShapping = cart.totalPrice + shipping;

  const allitemIds =
    theitems && theitems.length > 0
      ? theitems.map(item => item.product_id._id)
      : [];

  useEffect(() => {
    cartdatafunc(allitemIds);
  }, [itemsfeomcard]);

  return (
    <div>
      {" "}
      <div>
        {theitems && theitems.length > 0 ? (
          <div className="container ">
            {theitems.map((item, index) => (
              <div
                key={index}
                className={`${style.imgcontainer} row mb-2 p-0 m-0`}
              >
                <img
                  src={`${
                    process.env.REACT_APP_BASE_URL +
                    "/" +
                    item?.product_id?.images[0]?.src
                  }`}
                  alt={item.name}
                  className={`${style.productImg}  col-4`}
                />

                <div className={`${style.productInfo} col-7  `}>
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
                <div className="col-2 mt-3 fw-bold ">
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
              <div className="col-4 f-6">Shipping</div>
              <div className="col-5"></div>
              <div className="col-3 ">
                <h5>${shipping}</h5>
              </div>
            </div>
            <hr className="hr" />
            <div className="mb-1 row">
              <div className="col-2 f-bold">Total</div>
              <div className="col-7"></div>
              <div className="col-2">
                <p>
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
