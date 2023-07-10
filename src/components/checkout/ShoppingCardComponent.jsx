import { useSelector } from "react-redux";
import React, { useState } from "react";
import ProductCardCompnant from "./ProductCardCompnant";

import style from "../../pages/checkout/checkout.module.css";

export default function ShoppingCardComponent() {
  // const [availableItems, setAvailableItems] = useState([]);
  const cart = useSelector(state => state.cart.cart);
  let totalPrice = 0;
  const updatedAvailableItems = cart?.items?.filter(item => {
    if (item?.product_id?.colors[0]?.stock >= item?.quantity) {
      totalPrice += item.product_id.price * item.quantity;

      return item;
    }
  });
  const shipping = totalPrice >= 1200 ? 0 : 15;

  const priceWithShapping = (shipping + +totalPrice).toFixed(2);

  return (
    <div>
      <div className="ps-4 pt-2">
        {updatedAvailableItems && updatedAvailableItems?.length > 0 ? (
          <div className="container ">
            {updatedAvailableItems.map((item, index) => (
              <ProductCardCompnant index={index} item={item} key={item._id} />
            ))}
            <div
              className={`${style.Subtotal} mb-1 row mt-5 mx-0 
`}
            >
              <div className="col-2 ms-0 ps-0 ">Subtotal</div>
              <div className="col-7"></div>
              <div className="col-2">
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
