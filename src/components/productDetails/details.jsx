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
      (ele) => ele.product_id._id === product._id && color === ele.color
    );
    if (item) {
      setActiveQuantity(item.quantity);
      setInCart(true);
    } else {
      setInCart(false);
    }
  };

  const handleQuantityChange = (id, quantity) => {
    setActiveQuantity(quantity);
    updateItemQuantity(cart._id, id, quantity, activeColor);
  };

  const handleAddToCart = (id, color, price) => {
    setBtnSpinner(true);
    addItemToCart(cart._id, id, color, price);
  };

  const handleDeleteFromCart = () => {
    setBtnSpinner(true);
    deleteItemFromCart(cart._id, product._id, activeColor);
    setShowWarning(false);
  };

  const handleBuyProduct = (id, color, price) => {
    handleAddToCart(id, color, price);
    navigate("/cart");
  };

  useEffect(() => {
    setBtnSpinner(false);
    if (product) {
      if (cart.items?.length > 0) {
        let item;
        if (activeColor) {
          item = cart.items.find(
            (ele) =>
              ele.product_id._id === product._id && ele.color === activeColor
          );
          if (item) {
            setActiveQuantity(item.quantity);
            setActiveColor(item.color);
            setInCart(true);
          } else {
            setInCart(false);
          }
          return;
        } else {
          item = cart.items.find((ele) => ele.product_id._id === product._id);
          if (item) {
            setActiveQuantity(item.quantity);
            setActiveColor(item.color);
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
          <span className={product.stock === 0 ? "text-danger" : ""}>
            {product.stock > 0 ? product.stock : "Out Of Stock"}
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
              id={product._id}
              active={activeQuantity}
              stock={product.stock}
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
              cart.items
                ? handleAddToCart(product._id, activeColor, product.price)
                : dispatch(showLoginModal(true))
            }
            disabled={product.stock > 0 ? false : true}
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
          className="btn my-3 py-2 d-block w-100 bg-dark text-white text-uppercase"
          disabled={!terms || product.stock === 0 ? true : false}
          onClick={() =>
            cart.items
              ? handleBuyProduct(product._id, activeColor, product.price)
              : dispatch(showLoginModal(true))
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
