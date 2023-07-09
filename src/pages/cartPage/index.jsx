import { useSelector } from "react-redux";
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

//style
import style from "./cartPage.module.css";

function CartPage() {
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();

  const totalPrice =
    cart.items && cart.items.length > 0
      ? cart.items.reduce((acc, item) => {
          const itemPrice =
            item.price * item.quantity * (1 - item.discount / 100);
          return acc + itemPrice;
        }, 0)
      : 0;

  const handleReturnToShop = () => {
    navigate("/shop");
  };
  const handleCheckout = () => {
    navigate("/checkout");
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
      className={` table-responsive container-fluid ${style["cart-container"]}`}
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
                  className={`btn btn-dark rounded-1 border-0 px-4  ${style.cartBtn}`}
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
                  <div className="row justify-content-between align-items-center mx-0">
                    <div className="col-4">
                      <button
                        type="button"
                        className={`btn btn-dark rounded-1 py-2 border-0  ${style.cartBtn}`}
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
                        className={`btn btn-dark rounded-1 py-2 border-0 ${style.cartBtn}`}
                        onClick={() => emptyCart(cart._id)}
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
                        {`$${totalPrice.toFixed(2)}`}
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={5} className="border-0 py-4">
                  <button
                    type="button"
                    className={`${style.cartBtn} border-0 btn btn-dark w-50 rounded-1 py-2 px-4 my-3 fs-6`}
                    onClick={handleCheckout}
                  >
                    <strong>Checkout</strong>
                  </button>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default CartPage;
