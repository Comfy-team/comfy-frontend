import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// components
import Breadcrumb from "./breadcrumb";
import Price from "./price";
import Colors from "./colors";
import Quantity from "./quantity";
import AdditionalInfo from "./additionalInfo";
import { showLoginModal } from "../../store/slices/loginModalSlice";
import ConfirmPopup from "../common/confirmPopup";

// functions
import {
  deleteItemFromCart,
  updateItemQuantity,
  addItemToCart,
} from "../../functions/cart.js";

// style
import style from "../../pages/productDetails/productDetails.module.css";

const Details = ({ product }) => {
  const [activeColor, setActiveColor] = useState("");
  const [activeQuantity, setActiveQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [terms, setTerms] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showBtnSpinner, setBtnSpinner] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleColorChange = (color) => {
    setActiveColor(color);
    if (!cart.items) return;
    const item = cart.items.find(
      (ele) => ele.product_id._id === product._id && color.color === ele.color
    );
    if (item) {
      setActiveQuantity(item.quantity);
      setInCart(true);
    } else {
      setInCart(false);
    }
  };

  const handleQuantityChange = (quantity) => {
    setActiveQuantity(quantity);
    setBtnSpinner(true);
    updateItemQuantity(cart._id, product._id, quantity, activeColor.color);
  };

  const handleAddToCart = () => {
    setBtnSpinner(true);
    addItemToCart(cart._id, product._id, activeColor.color);
  };

  const handleDeleteFromCart = () => {
    setBtnSpinner(true);
    deleteItemFromCart(cart._id, product._id, activeColor.color);
    setShowWarning(false);
  };

  const handleBuyProduct = () => {
    if (!inCart) {
      handleAddToCart();
    }
    navigate("/checkout");
  };

  useEffect(() => {
    setBtnSpinner(false);
    if (product) {
      // check if user is logged in and not admin
      if (cart.items?.length > 0) {
        let item;
        // check if there's change in cart and affected current chosen color while user is on this page
        if (activeColor) {
          item = cart.items.find(
            (ele) =>
              ele.product_id._id === product._id &&
              ele.color === activeColor.color
          );
          if (item) {
            const newActiveColor = product.colors.find(
              (color) => color.color === item.color
            );
            setActiveQuantity(item.quantity);
            setActiveColor(newActiveColor);
            setInCart(true);
          } else {
            setInCart(false);
          }
          return;
        } else {
          // user just navigated to page
          item = cart.items.find((ele) => ele.product_id._id === product._id);
          if (item) {
            const newActiveColor = product.colors.find(
              (color) => color.color === item.color
            );
            setActiveQuantity(item.quantity);
            setActiveColor(newActiveColor);
            setInCart(true);
            return;
          }
        }
      }
      setActiveColor(product.colors[0]);
      setInCart(false);
    }
  }, [product, cart]);

  return product ? (
    <>
      <Breadcrumb name={product.name} />
      <h2 className="mb-3 mt-4">{product.name}</h2>
      <Price price={product.price} discount={product.discount} />
      <p
        className={`${style.description} overflow-hidden mt-3 mb-4 color-secondary-gray`}
      >
        {product.description}
      </p>
      <div className="border-top border-bottom py-4">
        <div className="d-flex align-items-center gap-2 mb-4">
          <span className="fw-semibold">Stock:</span>
          <span className={activeColor.stock === 0 ? "text-danger" : ""}>
            {activeColor.stock > 0 ? activeColor.stock : "Out Of Stock"}
          </span>
        </div>
        <div className="d-flex align-items-center gap-3 mb-4">
          <h3 className="h6 mb-0 fw-semibold">Colors:</h3>
          <Colors
            colors={product.colors}
            active={activeColor}
            onColorChange={handleColorChange}
          />
        </div>
        {inCart ? (
          showBtnSpinner ? (
            <div className="text-center">
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <Quantity
              active={activeQuantity}
              stock={activeColor.stock}
              onQuantityChange={handleQuantityChange}
              onDeleteItem={() => setShowWarning(true)}
            />
          )
        ) : showBtnSpinner ? (
          <button className="btn btn-bg-dark text-white text-capitalize px-5 rounded-2 d-block mx-auto">
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </button>
        ) : (
          <button
            onClick={() =>
              cart.items ? handleAddToCart() : dispatch(showLoginModal(true))
            }
            disabled={
              activeColor.stock > 0 && cart.role !== "admin" ? false : true
            }
            className="btn btn-bg-dark text-white text-capitalize px-5 rounded-2 d-block mx-auto"
          >
            Add to cart
          </button>
        )}
      </div>
      <div className="py-4">
        <form action="#">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value={terms}
              name="terms-and-conditions"
              checked={terms}
              onChange={() => setTerms(!terms)}
              id="flexCheckDefault"
            />
            <label
              className="form-check-label footer-color"
              htmlFor="flexCheckDefault"
            >
              I agree with the{" "}
              <Link to="/faq" className="color-main-black">
                terms and conditions
              </Link>
            </label>
          </div>
        </form>
        <button
          type="button"
          className="btn my-3 py-2 d-block w-100 btn-bg-dark text-white text-uppercase"
          disabled={
            !terms || activeColor.stock === 0 || cart.role === "admin"
              ? true
              : false
          }
          onClick={() =>
            cart.items ? handleBuyProduct() : dispatch(showLoginModal(true))
          }
        >
          buy it now
        </button>
        <AdditionalInfo product={product} />
      </div>
      {showWarning && (
        <ConfirmPopup
          msg={"Are you sure you want to delete from cart?"}
          onConfirm={handleDeleteFromCart}
          onCancel={() => setShowWarning(false)}
        />
      )}
    </>
  ) : (
    ""
  );
};

export default Details;
