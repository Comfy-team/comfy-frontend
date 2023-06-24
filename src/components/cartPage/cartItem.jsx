import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import {
  deleteItemFromCart,
  updateItemQuantity,
} from "../../functions/cart.js";
import style from "../../pages/cartPage/cartPage.module.css";
import { showCartModal } from "../../store/slices/cartModalSlice.js";
const CartItem = ({ item, cartId, product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCloseCart = () => {
    navigate(`/product-details/${item?.product_id._id}`);
    dispatch(showCartModal(false));
  };
  return (
    <tr className="w-100">
      <td>
        <div>
          <table className="text-center">
            <tbody>
              <tr>
                <td colSpan={2}>
                  <FontAwesomeIcon
                    icon={faClose}
                    onClick={() =>
                      deleteItemFromCart(cartId, item?.product_id._id)
                    }
                    type="button"
                    className="hover-color-yellow pe-4"
                  />
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
                <td className="ps-4">
                  <Link
                    to={`/product-details/${item?.product_id._id}`}
                    className="text-decoration-none text-dark"
                    onClick={handleCloseCart}
                    title={`Click to show details for ${item?.product_id.name}`}
                  >
                    <strong className="d-block text-truncate hover-color-yellow">
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
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </td>
      <td>
        <strong>${item.price}</strong>
      </td>
      <td>
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
      </td>
      <td>
        <strong>${(item.price * item.quantity).toFixed(2)}</strong>
      </td>
    </tr>
  );
};

export default CartItem;
