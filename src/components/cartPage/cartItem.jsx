// React imports
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Font Awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faSquarePlus,
  faSquareMinus,
} from "@fortawesome/free-solid-svg-icons";

// Local imports
import {
  deleteItemFromCart,
  updateItemQuantity,
} from "../../functions/cart.js";
import Price from "../cartModal/price.jsx";
import { showCartModal } from "../../store/slices/cartModalSlice.js";
import ConfirmPopup from "../common/confirmPopup.jsx";

//style
import style from "../../pages/cartPage/cartPage.module.css";

const CartItem = ({ item, cartId, product }) => {
  const [showBtnSpinner, setBtnSpinner] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const stock = item?.color
    ? item.product_id.colors.find((color) => color.color === item.color)?.stock
    : 0;

  const handleCloseCart = () => {
    navigate(`/product-details/${item?.product_id._id}`);
    dispatch(showCartModal(false));
  };
  const handleDelete = () => {
    setBtnSpinner(true);
    deleteItemFromCart(cartId, item?.product_id?._id, item.color).then(() => {
      setBtnSpinner(false);
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
                  <strong
                    className={`${style["item-name"]} d-block text-truncate hover-color-yellow`}
                  >
                    {item?.product_id.name}
                  </strong>
                </Link>
                {item?.color && (
                  <div className="d-flex fw-semibold">
                    Color:
                    <div
                      style={{ backgroundColor: `${item.color}` }}
                      className={`${style.circleColor} rounded-circle ms-2 mt-1 border-1`}
                    ></div>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
      <td>
        <Price
          price={item.product_id.price}
          discount={item.product_id.discount}
        />
      </td>
      <td>
        <span
          className={`${
            item.quantity > stock || stock === 0 ? "text-danger" : ""
          }`}
        >
          {stock > 0 ? stock : "Out Of Stock"}
        </span>
      </td>
      <td>
        <div
          className={`${style["counter"]} input-group justify-content-center`}
        >
          <button
            className="btn  rounded-0 border-0"
            type="button"
            onClick={() =>
              updateItemQuantity(
                cartId,
                item?.product_id._id,
                item.quantity - 1,
                item.color
              )
            }
            disabled={item.quantity === 1 || stock === 0}
          >
            <FontAwesomeIcon
              icon={faSquareMinus}
              size="lg"
              className="hover-color-yellow"
            />
          </button>

          <p className={`m-0 pt-1 px-1`}>{item?.quantity}</p>

          <button
            className="btn rounded-0 border-0"
            type="button"
            onClick={() =>
              updateItemQuantity(
                cartId,
                item?.product_id._id,
                item.quantity + 1,
                item.color
              )
            }
            disabled={item.quantity >= stock || stock === 0}
          >
            <FontAwesomeIcon
              icon={faSquarePlus}
              size="lg"
              className="hover-color-yellow"
            />
          </button>
        </div>
      </td>
      <td>
        <strong>
          $
          {(
            item?.product_id.price *
            (1 - item.product_id.discount / 100) *
            item.quantity
          ).toFixed(2)}
        </strong>
      </td>
      
        {showWarning && (<td>
          <ConfirmPopup
            msg={`Are you sure you want to delete ${item.product_id.name} from cart?`}
            onConfirm={handleDelete}
            onCancel={() => setShowWarning(false)}
          />
      </td>
        )}
    </tr>
  );
};

export default CartItem;
