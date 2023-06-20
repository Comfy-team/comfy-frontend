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

// functions
import {
  deleteItemFromCart,
  updateItemQuantity,
  addItemToCart,
} from "../../functions/cart.js";

// style
import style from "../../pages/productDetails/productDetails.module.css";

const Details = ({ product }) => {
  const [activeColor, setActiveColor] = useState();
  const [activeQuantity, setActiveQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [terms, setTerms] = useState(false);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const handleColorChange = (color) => {
    setActiveColor(color);
  };

  const handleQuantityChange = (id, quantity) => {
    setActiveQuantity(quantity);
    updateItemQuantity(cart._id, id, quantity);
  };

  const handleAddToCart = (id, color, price) => {
    if (!localStorage.getItem("userToken")) {
      dispatch(showLoginModal(true));
      return;
    }
    setInCart(true);
    addItemToCart(cart._id, id, color, price);
  };

  const handleDeleteFromCart = (id) => {
    setInCart(false);
    deleteItemFromCart(cart._id, id);
  };

  const handleBuyProduct = (id, color, price) => {
    handleAddToCart(id, color, price);
    navigate("/cart");
  };

  useEffect(() => {
    if (product) {
      setActiveColor(product.colors[0]);
      if (cart.items?.length > 0) {
        const item = cart.items.find((ele) => ele.product_id === product._id);
        if (item) {
          setActiveQuantity(item.quantity);
          setInCart(true);
        }
      }
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
          <span>{product.stock}</span>
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
          <Quantity
            id={product._id}
            active={activeQuantity}
            stock={product.stock}
            onQuantityChange={handleQuantityChange}
            onDeleteItem={handleDeleteFromCart}
          />
        ) : (
          <button
            onClick={() =>
              handleAddToCart(product._id, activeColor.color, product.price)
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
          className="btn my-3 py-2 d-block w-100 bg-dark text-white text-uppercase"
          disabled={!terms ? true : false}
          onClick={() =>
            handleBuyProduct(product._id, activeColor.color, product.price)
          }
        >
          buy it now
        </button>
        <AdditionalInfo product={product} />
      </div>
    </>
  ) : (
    "loading"
  );
};

export default Details;
