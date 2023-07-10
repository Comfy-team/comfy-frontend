import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ProductCardCompnant from "./ProductCardCompnant";

import style from "../../pages/checkout/checkout.module.css";

export default function ShoppingCardComponent() {
  const [availableItems, setAvailableItems] = useState([]);

  const cart = useSelector(state => state.cart.cart);
  // console.log(cart);

  useEffect(() => {
    const updatedAvailableItems = cart?.items?.filter(item => {
      return (
        item?.product_id?.colors?.length > 0 &&
        item?.product_id?.colors[0]?.stock >= item?.quantity
      );
    });
    setAvailableItems(updatedAvailableItems || []);
  }, [cart]);

  // console.log(availableItems);
  // Calculate the total price of the available items
  const totalPrice = availableItems?.reduce((sum, item) => {
    return sum + item.product_id.price * item.quantity;
  }, 0);
  // console.log(totalPrice);

  const shipping = totalPrice >= 1200 ? 0 : 15;

  const priceWithShapping = (shipping + +totalPrice).toFixed(2);
  // console.log(priceWithShapping);

  return (
    <div>
      <div className="ps-4 pt-2">
        {availableItems && availableItems.length > 0 ? (
          <div className="container ">
            {availableItems.map((item, index) => (
              <ProductCardCompnant index={index} item={item} key={item._id} />
            ))}
            <div
              className={`${style.Subtotal} mb-1 row mt-5 mx-0 
`}
            >
              <div className="col-2 ms-0 ps-0 ">Subtotal</div>
              <div className="col-7"></div>
              <div className="col-2">
                {" "}
                <p>${totalPrice}</p>
              </div>
            </div>
            <div className={`${style.Shipping}  mb-1 row mx-0`}>
              <div className="col-4 ps-0 ">Shipping</div>
              <div className="col-5"></div>
              <div className="col-3 ">
                {shipping === 0 ? (
                  <p className="">free shipping</p>
                ) : (
                  <p className="">${shipping}</p>
                )}
              </div>
            </div>
            <hr className="hr" />
            <div className="mb-1 row">
              <div className="col-4 ">Total</div>
              <div className="col-4"></div>
              <div className="col-4">
                <p className=" ">
                  <span className={`${style.currency}`}> USD</span>$
                  {priceWithShapping}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div> Cart is Empty</div>
        )}
      </div>
    </div>
  );
}
