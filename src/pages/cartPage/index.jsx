import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//fontawsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";

//components
import CartItem from "../../components/cartPage/cartItem";
import { emptyCart } from "../../functions/cart";
import { showToast } from "../../store/slices/toastSlice";
import ConfirmPopup from "../../components/common/confirmPopup";

//style
import style from "./cartPage.module.css";

function CartPage() {
  const cart = useSelector((state) => state.cart.cart);
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleReturnToShop = () => {
    navigate("/shop");
  };

  const handleCheckout = () => {
    const hasUnavailableItems = cart.items.some((item) => {
      const stock = item?.color
        ? item.product_id.colors.find((color) => color.color === item.color)
            ?.stock
        : 0;
      return item.quantity > stock;
    });
    if (hasUnavailableItems) {
      dispatch(showToast("Quantity cant be more than stock!"));
      return;
    }
    navigate("/checkout");
  };

  const handleEmptyCart = () => {
    emptyCart(cart._id);
    setShowWarning(false);
  };

  if (!cart || !cart.items) {
    return (
      <div className="text-center py-5">
        <p className="my-4 py-5 fs-5 fw-semibold">No items to show!</p>
      </div>
    );
  }

  return (
    <div
      className={`table-responsive container-fluid ${style["cart-container"]}`}
    >
      <table className="table text-center ">
        {cart.items.length > 0 && (
          <thead>
            <tr>
              <th scope="col">PRODUCT</th>
              <th scope="col">PRICE</th>
              <th scope="col">STOCK</th>
              <th scope="col">QUANTITY</th>
              <th scope="col">TOTAL</th>
            </tr>
          </thead>
        )}
        <tbody>
          {cart.items.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center pt-4 border-0">
                <span className="d-block py-3 fw-semibold">
                  Your cart is empty.
                </span>
                <button
                  type="button"
                  className="btn btn-bg-dark text-light rounded-1 border-0 px-4"
                  onClick={handleReturnToShop}
                >
                  CONTINUE SHOPPING
                </button>
              </td>
            </tr>
          ) : (
            <>
              {cart.items.map((item, index) => (
                <CartItem
                  item={item}
                  cartId={cart._id}
                  index={index}
                  key={item._id}
                />
              ))}
              <tr>
                <td colSpan={7}>
                  <div className="row justify-content-between align-items-center mx-0 py-2">
                    <div className="col-4">
                      <button
                        type="button"
                        className="btn btn-bg-dark text-light rounded-1 py-2 border-0"
                        onClick={handleReturnToShop}
                      >
                        <strong>
                          <FontAwesomeIcon
                            icon={faArrowAltCircleLeft}
                            className="me-2"
                          />
                          Continue Shopping
                        </strong>
                      </button>
                    </div>
                    <div className="col-5">
                      <button
                        type="button"
                        className="btn btn-bg-dark text-light rounded-1 py-2 border-0"
                        onClick={() => setShowWarning(true)}
                      >
                        <strong>
                          <FontAwesomeIcon icon={faTrashCan} className="me-2" />
                          Empty Shopping Cart
                        </strong>
                      </button>
                    </div>
                    <div className="col-3">
                      TOTAL PRICE:
                      <span className="color-yellow ps-1 fw-semibold">
                        ${cart.totalPrice}
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={5} className="border-0 pt-4">
                  <button
                    type="button"
                    className="border-0 btn btn-bg-dark text-light w-50 rounded-1 py-2 px-4 my-3 fs-6"
                    onClick={handleCheckout}
                  >
                    <strong>Checkout</strong>
                  </button>
                </td>
                {showWarning && (
                  <td>
                    <ConfirmPopup
                      msg={`Are you sure you want to remove all items from your cart?`}
                      onConfirm={handleEmptyCart}
                      onCancel={() =>setShowWarning(false)}
                    />
                  </td>
                )}
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default CartPage;
