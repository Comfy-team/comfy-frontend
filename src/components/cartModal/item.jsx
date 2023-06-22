import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {  faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import {
  deleteItemFromCart,
  updateItemQuantity,
} from "../../functions/cart.js";
import style from "./cartModal.module.css";

function Item({ item, cartId }) {
  return (
    <div className="row py-4">
      <div className="col-3 text-center">
        <img src={process.env.REACT_APP_BASE_URL + "/" + item?.product_id?.images[0].src} alt={item?.name} className=" w-100 h-70" />
      </div>
      <div className="col-4 pl-2">
        <p className="pl-2 fs-6 hover-color-yellow">
          <strong className="d-block text-truncate">{item?.product_id.name}</strong>
          <strong className="text-truncate">color: {item?.color}</strong>
        </p>
          <span className="text-secondary">{item?.quantity}x </span>
          <strong>${item?.price}</strong>
        <FontAwesomeIcon
          icon={faTrashCan}
          onClick={() => deleteItemFromCart(cartId, item?.product_id._id)}
          type="button"
          className="d-block pt-2"
        />
      </div>
      <div className="col-4 pt-4 ">
        <div className="input-group justify-content-center w-100">
          <button
            className="btn  rounded-0 border-light"
            type="button"
            onClick={() =>
              updateItemQuantity(cartId, item?.product_id._id, item.quantity - 1)
            }
            disabled={item.quantity === 1}
          >
            <FontAwesomeIcon icon={faMinus} size="xs" />
          </button>
          <p className={`m-0 pt-2 ${style["cart-quantity"]}`}>
              {item?.quantity}
            </p>
          <button
            className="btn  rounded-0 border-light"
            type="button"
            onClick={() =>
              updateItemQuantity(cartId, item?.product_id._id, item.quantity + 1)
            }
          >
           <FontAwesomeIcon icon={faPlus} size="xs" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Item;
