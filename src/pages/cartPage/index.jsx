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
    <div className={`${style["cart-container"]}`}>
      <div
        className={`container-fluid text-center py-4 ${style["cart-container"]}`}
      >
        {cart.items.length > 0 && (
          <div className="row">
            <div className="col-4">
              <strong>PRODUCT</strong>
            </div>
            <div className="col-2">
              <strong>PRICE</strong>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-3">
              <strong>QUANTITY</strong>
            </div>
            <div className="col-2">
              <strong>TOTAL</strong>
            </div>
            <hr />
          </div>
        )}
        {cart.items.length === 0 ? (
          <div className="text-center pt-3">
            <strong className="d-block py-3">Your cart is empty.</strong>
            <button
              type="button"
              className={`btn btn-dark rounded-0 border-0 px-2 mb-5 ${style["cart-btn"]} pr-2`}
              onClick={handleReturnToShop}
            >
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          <div>
            {cart.items.map((item, index) => {
              return (
                <div key={item.product_id}>
                  <CartItem item={item} cartId={cart._id} index={index} />
                </div>
              );
            })}
            <div className="container-fluid ">
              <div className="row pb-3">
                <div className="col-12 col-md-4 text-center mb-3 mb-md-0">
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
                </div>
                <div className="col-12 col-md-4 text-center mb-3 mb-md-0">
                  <button
                    type="button"
                    className={`btn btn-dark w-40 px-5 rounded-1 py-2 border-0 ${style["cart-btn"]}`}
                    onClick={() => emptyCart(cart._id)}
                  >
                    <strong>
                      <FontAwesomeIcon icon={faTrashCan} className="px-1" />
                      Empty Cart
                    </strong>
                  </button>
                </div>
                <div className="col-12 col-md-4 text-center mb-3 mb-md-0">
                  <div className=" border-0 fs-6">
                    <span  >
                      CART TOTALS: 
                      <strong className="color-yellow px-2">${cart?.totalPrice}</strong>
                    </span>
                  </div>
                </div>
              </div>
              <hr />
            </div>
            <div className="row py-5 justify-content-center">
              <button
                type="button"
                className={`${style["cart-btn"]} col-8  border-0 btn btn-dark w-60 rounded-1 py-2 px-4 my-2 fs-6`}
                onClick={handleCheckout}
              >
                <strong>Checkout</strong>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
