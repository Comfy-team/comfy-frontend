import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import CartItem from "../../components/cartPage/cartItem";
// import { emptyCart } from "../../functions/cart.js";
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
    <div>
      <div className="container-fluid text-center py-4">
        <div className="row">
          <div className="col-6">
            <strong>PRODUCT</strong>
          </div>
          <div className="col-2">
            <strong>PRICE</strong>
          </div>
          <div className="col-2">
            <strong>QUANTITY</strong>
          </div>
          <div className="col-2">
            <strong>TOTAL</strong>
          </div>
        </div>
        <hr />
        {cart.items.length === 0 ? (
          <div className="text-center pt-4">
            <strong className="d-block py-3">Your cart is empty.</strong>
            <button
              type="button"
              className={`btn btn-dark rounded-0 border-0 px-2 mb-5 ${style["cart-btn"]}`}
              onClick={handleReturnToShop}
            >
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          <>
            {cart.items.map((item, index) => {
              return (
                <div key={item.product_id}>
                  <CartItem item={item} cartId={cart._id} index={index} />
                </div>
              );
            })}
            <div className="container-fluid ">
              <div className="row pb-3">
                <div className="col-4 text-start">
                  <button
                    type="button"
                    className={`btn btn-dark w-40 px-3 rounded-1 py-2 border-0 ${style["cart-btn"]}`}
                    onClick={handleReturnToShop}
                  >
                    <strong>
                      <FontAwesomeIcon
                        icon={faArrowAltCircleLeft}
                        className="px-1"
                      />{" "}
                      Continue Shopping
                    </strong>
                  </button>
                </div>
                <div className="col-4 text-end">
                  <button
                    type="button"
                    className={`btn btn-dark w-40 px-5 rounded-1 py-2 border-0 ${style["cart-btn"]}`}
                    // onClick={() => emptyCart(cartId)}
                  >
                    <strong>
                      <FontAwesomeIcon icon={faTrashCan} className="px-1" />{" "}
                      Empty Cart
                    </strong>
                  </button>
                </div>
                <div className="col-4 text-end px-4 ">
                  <div className="d-flex border-0 fs-6 px-4  ">
                    <p className="px-2 w-100">CART TOTALS : </p>
                    <strong>${cart?.totalPrice}</strong>
                  </div>
                </div>
              </div>
              <hr />
            </div>
            <div className="container-fluid py-5">
              <button
                type="button"
                className={`${style["cart-btn"]} border-0 btn btn-dark w-50 rounded-1 py-2 px-4 my-2 fs-6`}
                onClick={handleCheckout}
              >
                <strong>Checkout</strong>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
