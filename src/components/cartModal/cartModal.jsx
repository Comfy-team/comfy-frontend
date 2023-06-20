import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { faClose, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../functions/cart";
import style from "./cartModal.module.css";
import Item from "./item";

function CartModal({ showModal, hideModal }) {
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (showModal) {
      document.body.classList.add(`${style["no-scroll"]}`);
    }
  }, [showModal]);

  useEffect(() => {
    return () => {
      document.body.classList.remove(`${style["no-scroll"]}`);
    };
  }, []);

  const handleCheckout = () => {
    hideModal();
    navigate("/checkout");
  };

  const handleViewCart = () => {
    hideModal();
    navigate("/cart");
  };

  const handleReturnToShop = () => {
    hideModal();
    navigate("/shop");
  };

  return (
    <>
      {showModal && (
        <div className="container ">
          <div
            className={`${style["modal"]} modal fade show d-block justify-content-end fs-6`}
            tabIndex="-1"
            role="dialog"
          >
            <div
              className={`${style["modal-dialog"]} modal-lg h-100`}
              role="document"
            >
              <div className={`${style["modal-content"]} border-0 rounded-0`}>
                <div className="modal-header  bg-dark rounded-0 text-light ">
                  <p className="modal-title px-4" id="cartModalLabel">
                    Shopping Cart
                  </p>

                  <span aria-hidden="true" className="pointer">
                    <FontAwesomeIcon
                      icon={faClose}
                      size="lg"
                      className="close pointer"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={hideModal}
                    />
                  </span>
                </div>
                <div className="modal-body">
                  {cart.items.length === 0 ? (
                    <div className="text-center pt-4">
                      <p>Your cart is empty.</p>
                      <button
                        type="button"
                        className="btn btn-dark rounded-0 p-3"
                        size="lg"
                        onClick={handleReturnToShop}
                      >
                        Return to Shop
                      </button>
                    </div>
                  ) : (
                    <>
                      <div
                        className={`${style["product-container"]} container-fluid  w-100`}
                      >
                        {cart.items.map((item, index) => (
                          <>
                            <Item
                              key={item.product_id}
                              item={item}
                              cartId={cart._id}
                            />

                            {index !== cart.items.length - 1 && (
                              <hr className="text-secondary" />
                            )}
                          </>
                        ))}
                      </div>
                      <div className="container pr-4"></div>
                    </>
                  )}
                </div>
                <div className="container px-4">
                  {cart.items.length > 0 && (
                    <div className={`${style["modal-footer"]}  w-100 border-0`}>
                      <div
                        className={`${style["progress"]} progress w-100 rounded-0 position-relative`}
                      >
                        <div
                          className={`${style["dark-bar"]} progress-bar`}
                          role="progressbar"
                          style={{
                            width:
                              ((cart.totalPrice / 1200) * 100).toFixed(2) + "%",
                            backgroundColor:
                              cart.totalPrice >= 1200 ? "#343a40" : "#007bff",
                          }}
                          aria-valuenow={cart.totalPrice}
                          aria-valuemin="0"
                          aria-valuemax="1200"
                        >
                          <span className="sr-only">
                            {cart.totalPrice} of 1200
                          </span>
                        </div>
                        <div
                          className={`${style["yellow-bar"]} progress-bar ${
                            cart.totalPrice >= 1200 ? style["d-none"] : ""
                          }`}
                          role="progressbar"
                          style={{
                            width:
                              ((1 - cart.totalPrice / 1200) * 100).toFixed(2) +
                              "%",
                          }}
                          aria-valuenow={1200 - cart.totalPrice}
                          aria-valuemin="0"
                          aria-valuemax="1200"
                        >
                          <span className="sr-only">
                            {1200 - cart.totalPrice} remaining
                          </span>
                        </div>
                        <div
                          className={`${style["progress-bar-text"]} text-light w-100 text-center`}
                        >
                          <FontAwesomeIcon
                            icon={faTruck}
                            size="lg"
                            className="px-2"
                          />
                          {cart.totalPrice < 1200 &&
                            `Spend $${(1200 - cart.totalPrice).toFixed(
                              2
                            )}  more and get Free Shipping!`}
                          {cart.totalPrice >= 1200 &&
                            "You've reached Free Shipping!"}
                        </div>
                      </div>

                      <div className="justify-content-between d-flex border-0 fs-6 w-100">
                        <strong> Price: </strong>
                        <strong>${cart.totalPrice}</strong>
                      </div>

                      <div className="border-0 justify-content-center text-center w-100">
                        <button
                          type="button"
                          className={`${style["checkout-btn"]} btn btn-light w-100 rounded-0 py-2 px-4 my-2 fs-6`}
                          onClick={handleCheckout}
                        >
                          <strong>Checkout</strong>
                        </button>

                        <Link
                          to="/cart"
                          className="text-dark fs-6 "
                          onClick={handleViewCart}
                        >
                          View cart
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CartModal;
