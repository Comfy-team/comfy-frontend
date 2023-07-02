import React from "react";

import "../../App.css";
import style from "../../pages/checkout/checkout.module.css";

export default function ProductCardCompnant({ index, item }) {
  return (
    <>
      {" "}
      <div key={index} className={`${style.imgcontainer} row mb-2 p-0 m-0`}>
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
          <div className={`${style.quantitCircle} mb-1"`}>{item.quantity}</div>

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
    </>
  );
}
