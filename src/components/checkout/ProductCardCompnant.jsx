import React from "react";

import style from "../../pages/checkout/checkout.module.css";

export default function ProductCardCompnant({ index, item }) {
  return (
    <>
      {" "}
      <div key={item._id} className={`${style.imgcontainer} row mb-2 p-0 m-0`}>
        <div className="col-2 ">
          <img
            className={`${style.productImg}  `}
            alt={item.name}
            src={`${
              process.env.REACT_APP_BASE_URL +
              "/" +
              item?.product_id?.images[0]?.src
            }`}
          />
        </div>
        <div className={`${style.productInfo} col-7  ps-4`}>
          <p className="mb-0 ">{item?.product_id?.name}</p>
          <div className={`${style.quantitCircle} mb-1"`}>{item?.quantity}</div>
          <div
            key={item.product_id}
            className={`${style.spanColor} `}
            style={{ backgroundColor: `${item?.color}` }}
          ></div>
        </div>
        <div className="col-2 mt-3  ">
          <p className="mb-0">
            $
            {item.product_id.price -
              (item.product_id.price * item.product_id.discount) / 100}
          </p>
          {item.product_id.discount !== 0 && (
            <p className={`${style.gray} mb text-decoration-line-through`}>
              ${item.product_id.price}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
