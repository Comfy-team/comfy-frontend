import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// components
import Breadcrumb from "./breadcrumb";
import Price from "./price";
import Colors from "./colors";
import Quantity from "./quantity";
import AdditionalInfo from "./additionalInfo";

// style
import style from "../../pages/productDetails/productDetails.module.css";

const Details = ({ product }) => {
  const [activeColor, setActiveColor] = useState();
  const [activeQuantity, setActiveQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [terms, setTerms] = useState(false);

  const handleColorChange = (id) => {
    setActiveColor(id);
  };

  const handleQuantityChange = (quantity) => {
    setActiveQuantity(quantity);
  };

  const handleAddToCart = (id) => {
    if(localStorage.getItem("userToken")) {
      setInCart(true);
    }
  };

  useEffect(() => {
    setActiveColor(product?.colors[0]._id);
  }, [product]);

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
            active={activeQuantity}
            stock={product.stock}
            onQuantityChange={handleQuantityChange}
          />
        ) : (
          <button
            onClick={() => handleAddToCart(product._id)}
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
