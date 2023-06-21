import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import {
  deleteItemFromCart,
  updateItemQuantity,
} from "../../functions/cart.js";
import style from "../../pages/cartPage/cartPage.module.css";

const CartItem = ({ item, cartId }) => {
  return (
    <div className="container-fluid text-center py-4">
      <div className="row">
        <div className="col-6">
          <div className="raw">
            <div className="col-3">
              <strong>
                <FontAwesomeIcon
                  icon={faClose}
                  onClick={() => deleteItemFromCart(cartId, item.product_id)}
                  type="button"
                  className="hover-color-yellow"
                />
              </strong>
            </div>
            <div className="col-4">
              <strong>
                {/* <img src={process.env.REACT_APP_BASE_URL + "/" + product?.images[0].src} alt={item.name} /> */}
              </strong>
            </div>
            <div className="col-5">
              <strong>{item.name}</strong>
            </div>
          </div>
          <strong className="d-block">color: {item.color}</strong>
        </div>
        <div className="col-2">
          <strong>${item.price}</strong>
        </div>
        <div className="col-2 text-center">
          <div className="input-group px-5">
            <button
              className="btn  rounded-0 border-0"
              type="button"
              onClick={() =>
                updateItemQuantity(cartId, item.product_id, item.quantity - 1)
              }
              disabled={item.quantity === 1}
            >
              <FontAwesomeIcon icon={faMinus} size="sm" className="text-secondary"/>
            </button>
            <input
              type="text"
              className={`${style["input-text"]}  form-control text-center border-light`}
              value={item.quantity}
              readOnly
            />
            <button
              className="btn rounded-0 border-0"
              type="button"
              onClick={() =>
                updateItemQuantity(cartId, item.product_id, item.quantity + 1)
              }
            >
              <FontAwesomeIcon icon={faPlus} size="sm" className="text-secondary"/>
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
