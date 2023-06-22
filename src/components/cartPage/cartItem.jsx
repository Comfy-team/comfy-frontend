import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import {
  deleteItemFromCart,
  updateItemQuantity,
} from "../../functions/cart.js";
import style from "../../pages/cartPage/cartPage.module.css";

const CartItem = ({ item, cartId }) => {
  return (
    <div className="container-fluid text-center py-2">
      <div className="row">
        <div className="col-4">
        <div className="row">
  <strong className="col-12 col-md-12 col-lg-2">
    <FontAwesomeIcon
      icon={faClose}
      onClick={() => deleteItemFromCart(cartId, item?.product_id._id)}
      type="button"
      className="hover-color-yellow "
    />
  </strong>
  <strong className="col-12 col-md-12 col-lg-4 text-center">
  <img
    src={
      item.product_id?.images?.[0]?.src
        ? process.env.REACT_APP_BASE_URL +
          "/" +
          item.product_id.images[0].src
        : ""
    }
    alt={item.name}
    className={`${style["item-img"]}`}
  />
  </strong>
  <div className="col-12 col-md-12 col-lg-4">
    <p className="hover-color-yellow text-truncate">
      {item.product_id.name}
    </p>
    <p>
      <strong>color:</strong> {item.color}
    </p>
  </div>
</div>
        </div>
        <div className="col-2">
          <strong>${item.price}</strong>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-4 col-3  text-center ">
          <div className={`${style["input-group"]} justify-content-center`} >
            <button
              type="button"
              className={`btn btn-dark rounded-circle border-0 text-center ${style["cart-btn"]} ${style["quantity-btn"]}`}
              onClick={() =>
                updateItemQuantity(cartId, item?.product_id._id, item.quantity + 1)
              }
            >
              <FontAwesomeIcon icon={faPlus} size="xs" />
            </button>
            
            <p className={`m-0 mx-3 ${style["cart-quantity"]}`}>
              {item.quantity}
            </p>
            <button
              type="button"
              className={`btn btn-dark rounded-circle border-0 ${style["cart-btn"]} ${style["quantity-btn"]}`}
              onClick={() =>
                updateItemQuantity(cartId, item?.product_id._id, item.quantity - 1)
              }
              disabled={item.quantity === 1 ? true : false}
            >
              <FontAwesomeIcon icon={faMinus} size="xs" />
            </button>
          </div>
        </div>
        <div className="col-2">
          <strong>${(item.price * item.quantity).toFixed(2)}</strong>
        </div>
      </div>
      <hr className="text-secondary" />
    </div>
  );
};

export default CartItem;
