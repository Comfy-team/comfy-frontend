import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

import {
  deleteItemFromCart,
  updateItemQuantity,
} from "../../functions/cart.js";
import style from "./cartModal.module.css";

function Item({ item, cartId }) {
  return (
    <div className="row py-4">
      <div className="col-3 text-center">
        {/* <img src={process.env.REACT_APP_BASE_URL + "/" + product?.images[0].src} alt={item.name} /> */}
      </div>
      <div className="col-5 pl-2">
        <p className="pl-2 fs-6 hover-color-yellow">
          <strong className="d-block">{item.name}</strong>
          <strong className="d-block">color: {item.color}</strong>

          <strong>${item.price}</strong>
        </p>
        <FontAwesomeIcon
          icon={faTrashCan}
          onClick={() => deleteItemFromCart(cartId, item.product_id)}
          type="button"
        />
      </div>
      <div className="col-4">
        <div className="input-group">
          <button
            className="btn  rounded-0 border-light"
            type="button"
            onClick={() =>
              updateItemQuantity(cartId, item.product_id, item.quantity - 1)
            }
            disabled={item.quantity === 1}
          >
            -
          </button>
          <input
            type="text"
            className={`${style["input-text"]}  form-control text-center border-light`}
            value={item.quantity}
            readOnly
          />
          <button
            className="btn  rounded-0 border-light"
            type="button"
            onClick={() =>
              updateItemQuantity(cartId, item.product_id, item.quantity + 1)
            }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default Item;
