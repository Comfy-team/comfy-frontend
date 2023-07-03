// React imports
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Font Awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

// Local imports
import {
  deleteItemFromCart,
  updateItemQuantity,
} from "../../functions/cart.js";
import RemoveProductWarning from "../common/removeProductWarning.jsx";
import { showCartModal } from "../../store/slices/cartModalSlice.js";

//style
import style from "../../pages/cartPage/cartPage.module.css";

const CartItem = ({ item, cartId, product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showBtnSpinner, setBtnSpinner] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleCloseCart = () => {
    navigate(`/product-details/${item?.product_id._id}`);
    dispatch(showCartModal(false));
  };
  const handleDelete = () => {
    setBtnSpinner(true); // show spinner
    deleteItemFromCart(cartId, item?.product_id?._id, item.color).then(() => {
      setBtnSpinner(false); // hide spinner
      setShowWarning(false);
    });
  };
  return (
    <tr className="w-100">
      <td className="w-25">
        <table className="text-center">
          <tbody>
            <tr>
              <td colSpan={2}>
                {showBtnSpinner ? (
                  <div
                    className="spinner-border spinner-border-sm text-dark mx-4"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <FontAwesomeIcon
                    icon={faClose}
                    onClick={() => setShowWarning(true)}
                    type="button"
                    className="hover-color-yellow px-4"
                  />
                )}
              </td>
              <td>
                <img
                  src={
                    item.product_id?.images?.[0]?.src
                      ? process.env.REACT_APP_BASE_URL +
                        "/" +
                        item.product_id.images[0].src
                      : ""
                  }
                  alt={item.name}
                  className={`${style["item-img"]} `}
                />
              </td>
              <td className="ps-3">
                <Link
                  to={`/product-details/${item?.product_id._id}`}
                  className="text-decoration-none text-dark"
                  onClick={handleCloseCart}
                >
                  <strong className={`${style["item-name"]} d-block text-truncate hover-color-yellow`}>
                    {item?.product_id.name}
                  </strong>
                </Link>
                {item?.color && (
                  <h6 className="d-flex">
                    Color:{" "}
                    <div
                      style={{ backgroundColor: `${item.color}` }}
                      className={`${style.spanColor} rounded-circle ms-2 border-dark border-1`}
                    ></div>
                  </h6>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
      <td>
        <strong>${item.price}</strong>
      </td>
      <td>
        <span className={item.product_id.stock === 0 ? "text-danger" : ""}>
          {item.product_id.stock > 0 ? item.product_id.stock : "Out Of Stock"}
        </span>
      </td>
      <td>
        <div className="input-group justify-content-center">
          <button
            className={`btn ${style["counter-btn"]} rounded-0 border-0`}
            type="button"
            onClick={() =>
              updateItemQuantity(
                cartId,
                item?.product_id._id,
                item.quantity - 1,
                item.color
              )
            }
            disabled={item.quantity === 1}
          >
            <FontAwesomeIcon icon={faMinus} size="xs" className="hover-color-yellow"/>
          </button>
          <p className={`${style["counter-value"]} m-0  px-1`}>{item?.quantity}</p>
          <button
            className={`btn ${style["counter-btn"]} rounded-0 border-0`}
            type="button"
            onClick={() =>
              updateItemQuantity(
                cartId,
                item?.product_id._id,
                item.quantity + 1,
                item.color
              )
            }
            disabled={item.quantity === item.product_id.stock}
          >
            <FontAwesomeIcon icon={faPlus} size="xs" className="hover-color-yellow"/>
          </button>
        </div>
      </td>
      <td>
        <strong>${(item.price * item.quantity).toFixed(2)}</strong>
      </td>
      {showWarning && (
        <RemoveProductWarning
          onRemove={handleDelete}
          onCancel={() => setShowWarning(false)}
        />
      )}
    </tr>
  );
};

export default CartItem;
