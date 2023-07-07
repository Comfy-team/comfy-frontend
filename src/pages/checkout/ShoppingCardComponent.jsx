import React, { useState, useEffect } from "react";
import style from "./checkout.module.css";
import { useSelector } from "react-redux";
import ProductCardCompnant from "./../../components/checkout/ProductCardCompnant";

export default function ShoppingCardComponent() {
  let [theitems, SetItems] = useState([]);

  const cart = useSelector(state => state.cart.cart);
  console.log("cart", cart);
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
  const priceWithShapping = cart?.totalPrice + shipping;

  return (
    <div>
      {/* <Price price={item.price} discount={item?.product_id.discount} /> */}
      <div className="ps-4 pt-2">
        {theitems && theitems.length > 0 ? (
          <div className="container ">
            {theitems.map((item, index) => (
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
                <p>${cart?.totalPrice}</p>
              </div>
            </div>
            <div className={`${style.Shipping}  mb-1 row mx-0`}>
              <div className="col-4 ps-0 ">Shipping</div>
              <div className="col-5"></div>
              <div className="col-3 ">
                <p className="">${shipping}</p>
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
        )}{" "}
      </div>
    </div>
  );
}
