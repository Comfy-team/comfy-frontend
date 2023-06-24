import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import CartItem from "../../components/cartPage/cartItem";
import { emptyCart } from "../../functions/cart";
import style from "./cartPage.module.css";
function CartPage(cartId) {
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart.cart);
  const handleReturnToShop = () => {
    navigate("/shop");
  };
  const handleCheckout = () => {
    navigate("/checkout");
  };
  if (!cart || !cart.items) {
    return <div>Loading...</div>;
  }
  return (
    <div className="table-responsive container-fluid">
      <table className="table text-center">
        {cart.items.length > 0 && (
          <thead>
            <tr>
              <th scope="col">PRODUCT</th>
              <th scope="col">PRICE</th>
              <th scope="col">QUANTITY</th>
              <th scope="col">TOTAL</th>
            </tr>
          </thead>
        )}
        <tbody>
          {cart.items.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center pt-3">
                <strong className="d-block py-3">Your cart is empty.</strong>
                <button
                  type="button"
                  className={`btn btn-dark rounded-0 border-0 px-2 mb-5 ${style["cart-btn"]} pr-2`}
                  onClick={handleReturnToShop}
                >
                  CONTINUE SHOPPING
                </button>
              </td>
            </tr>
          ) : (
            <>
              {cart.items.map((item, index) => (
                <>
                  <CartItem
                    key={item.product_id}
                    item={item}
                    cartId={cart._id}
                    index={index}
                  />
                </>
              ))}
              <tr>
                <td className="justify-content-start">
                  <button
                    type="button"
                    className={`btn btn-dark w-40 px-3 rounded-1 py-2 border-0 ${style["cart-btn"]}`}
                    onClick={handleReturnToShop}
                  >
                    <strong>
                      <FontAwesomeIcon
                        icon={faArrowAltCircleLeft}
                        className="px-1"
                      />
                      Continue Shopping
                    </strong>
                  </button>
                </td>
                <td className="justify-content-start">
                  <button
                    type="button"
                    className={`btn btn-dark w-40 px-5 rounded-1 py-2 border-0 ${style["cart-btn"]} `}
                    onClick={() => emptyCart(cart._id)}
                  >
                    <strong>
                      <FontAwesomeIcon icon={faTrashCan} className="px-1" />
                      Empty Cart
                    </strong>
                  </button>
                </td>
                <td colSpan={2}>
                  <div className="border-0 fs-6">
                    <span>
                      TOTAL PRICE:
                      <strong className="color-yellow px-2">
                        ${cart?.totalPrice}
                      </strong>
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={4}>
                  <button
                    type="button"
                    className={`${style["cart-btn"]} col-8 border-0 btn btn-dark w-50 rounded-1 py-2 px-4 my-2 fs-6`}
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
