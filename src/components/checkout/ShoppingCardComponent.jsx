import { useSelector } from "react-redux";
import React from "react";
import ProductCardCompnant from "./ProductCardCompnant";

import style from "../../pages/checkout/checkout.module.css";

export default function ShoppingCardComponent() {
  const cart = useSelector(state => state.cart.cart);
  let totalPrice = 0;
  const updatedAvailableItems = cart?.items?.filter(item => {
    const color = item?.color;
    const stock = item?.product_id?.colors.find(c => c.color === color)?.stock;

    if (stock >= item?.quantity) {
      totalPrice +=
        item?.product_id.price *
        (1 - item.product_id.discount / 100) *
        item.quantity;
      return item;
    }
  });

  const shipping = totalPrice >= 1200 ? 0 : 15;

  const priceWithShapping = (shipping + +totalPrice).toFixed(2);

  return (
    <div>
      <div className="ps-0 ps-sm- ps-4 pt-2">
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
              <div className="col-sm-2 col-md-4 col-4 ">Total</div>
              <div className="col-sm-0 col-md-4 col-3"></div>

              <div className="col-sm-7 col-md-4 col-4">
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
