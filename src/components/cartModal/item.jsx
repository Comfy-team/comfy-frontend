import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import {
  deleteItemFromCart,
  updateItemQuantity,
} from "../../functions/cart.js";
import style from "./cartModal.module.css";
import { showCartModal } from "../../store/slices/cartModalSlice.js";

function Item({ item, cartId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCloseCart = () => {
    navigate(`/product-details/${item?.product_id._id}`);
    dispatch(showCartModal(false));
  };
  return (
    <div className="py-2">
      <div className="row">
        <div className="col-4">
          <img
            src={
              process.env.REACT_APP_BASE_URL +
              "/" +
              item?.product_id?.images[0].src
            }
            alt={item?.name}
            className=" w-100 h-70"
          />
        </div>
        <div className="col-8 ">
          <Link
            to={`/product-details/${item?.product_id._id}`}
            className="text-decoration-none text-dark"
            onClick={handleCloseCart}
          >
            <strong className="d-block text-truncate hover-color-yellow">
              {item?.product_id.name}
            </strong>
          </Link>
          <div className="row">
            <div className="col-6">
              {item?.color && (
                <strong className="d-flex">
                  Color:{" "}
                  <div
                    style={{ backgroundColor: `${item.color}` }}
                    className={`${style.spanColor} rounded-circle ms-2 border-dark border-1`}
                  ></div>
                </strong>
              )}

              <strong className="d-block">${item?.price}</strong>
              <FontAwesomeIcon
                icon={faTrashCan}
                onClick={() =>
                  deleteItemFromCart(cartId, item?.product_id?._id)
                }
                type="button"
                className="p-2"
                size="sm"
              />
            </div>
            <div className="col-6">
              <div className="input-group justify-content-center w-100">
                <button
                  className="btn  rounded-0 border-light"
                  type="button"
                  onClick={() =>
                    updateItemQuantity(
                      cartId,
                      item?.product_id._id,
                      item.quantity - 1
                    )
                  }
                  disabled={item.quantity === 1}
                >
                  <FontAwesomeIcon icon={faMinus} size="xs" />
                </button>
                <p className={`m-0 p-2`}>{item?.quantity}</p>
                <button
                  className="btn rounded-0 border-light"
                  type="button"
                  onClick={() =>
                    updateItemQuantity(
                      cartId,
                      item?.product_id._id,
                      item.quantity + 1
                    )
                  }
                >
                  <FontAwesomeIcon icon={faPlus} size="xs" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
