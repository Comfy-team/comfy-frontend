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
  const cart = useSelector((state) => state.cart.cart);
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
            <div className=" mt-4">
              <div colSpan="4" className="text-center pt-4 mt-4">
                <span className="d-block py-3 fw-semibold">Your cart is empty.</span>
                <button
                  type="button"
                  className={`btn btn-dark rounded-1 border-0 px-4 mb-5 ${style["cart-btn"]} pr-2`}
                  onClick={handleReturnToShop}
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            </div>
          ) : (
            <>
              {cart.items.map((item, index) => (
                <>
                  <CartItem
                    key={item._id}
                    item={item}
                    cartId={cart._id}
                    index={index}
                  />
                </>
              ))}
              <tr>
                <td colSpan={5}>
                  <div className="row justify-content-between align-items-center">
                    <div className="col-4 mb-2">
                      <button
                        type="button"
                        className={`btn btn-dark rounded-1 py-2 border-0  ${style["cart-btn"]}`}
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
                    <div className="col-5 mb-2 ms-5">
                      <button
                        type="button"
                        className={`btn btn-dark rounded-1 py-2 border-0 ${style["cart-btn"]}`}
                        onClick={() => emptyCart(cart._id)}
                      >
                        <strong>
                          <FontAwesomeIcon icon={faTrashCan} className="me-2" />
                          Empty Shopping Cart
                        </strong>
                      </button>
                    </div>
                    <div className="col-2">
                      <div
                        className={`border-0 fs-6 pe-4  ${style["cart-total-price"]}`}
                      >
                        <span>TOTAL PRICE:</span>
                        <strong className="color-yellow ps-2">
                          ${cart?.totalPrice}
                        </strong>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={5}>
                  <button
                    type="button"
                    className={`${style["cart-btn"]}  border-0 btn btn-dark w-50 rounded-1 py-2 px-4 my-2 fs-6`}
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
