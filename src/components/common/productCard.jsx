import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { deleteItemFromCart,addItemToCart } from "../../functions/cart";

const ProductCard = ({ product }) => {
  const [showButton, setShowButton] = useState(false);
  const [inCart, setInCart] = useState(
    localStorage.getItem(`cartItem_${product._id}`) === "true"
  );
  const cart=useSelector((state)=>state.cart.cart)

  const handleMouseEnter = () => {
    setShowButton(true);
  };

  const handleMouseLeave = () => {
    setShowButton(false);
  };
  const handleDeleteFromCart = (id) => {
    setInCart(false);
    deleteItemFromCart(cart._id, id);
    localStorage.removeItem(`cartItem_${id}`); // remove the cart item from localStorage
  };
  const handleAddToCart = (id, color, price) => {
    if (!localStorage.getItem("userToken")) {
      return;
    }
    setInCart(true);
    addItemToCart(cart._id, id, color, price);
    localStorage.setItem(`cartItem_${id}`, true); // set the cart item in localStorage
  };


  return (
    <div
      className="product-card card position-relative border-0 rounded-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {product?.discount > 0 && (
        <span className="badge d-block bg-yellow position-absolute text-white">
          -{product.discount}%
        </span>
      )}
      <Link
        to={`/product-details/${product._id}`}
        className="holder position-relative overflow-hidden"
      >
        <img
          src={process.env.REACT_APP_BASE_URL + "/" + product?.images[0].src}
          alt={product?.name}
          className="img-fluid card-img-top rounded-0"
        />
        <img
          src={process.env.REACT_APP_BASE_URL + "/" + product?.images[1].src}
          alt={product?.name}
          className="img-fluid card-img-top rounded-0 hover-img position-absolute w-100 h-100 top-0 start-0"
        />
      {inCart ? (
          <button
            className="btn text-dark removeFromCart-btn w-75 p-3 border-0 fw-bold position-absolute bottom-0 start-50 translate-middle"
            onClick={(event) =>{event.preventDefault(); handleDeleteFromCart(product?._id)}}
          >
            Remove from Cart
          </button>
        ) : (
          <button
            className="btn btn-light w-75 p-3 border-0 addToCart-btn fw-bold position-absolute bottom-0 start-50 translate-middle"
            onClick={(event) =>{event.preventDefault(); 
              handleAddToCart(product._id, product.colors[0].color, product.price);
            }}
            style={{ pointerEvents: !showButton ? "none" : "auto" }}
          >
            <FontAwesomeIcon icon={faPlus} /> Add to Cart
          </button>
        )}
      </Link>
      <div className="card-body text-center">
        <h3 className="h6 fw-bold card-title">
          <Link
            className="d-block text-ellipsis text-decoration-none hover-color-yellow color-product-name"
            to={`/product-details/${product._id}`}
          >
            {product?.name}
          </Link>
        </h3>
        <div className="card-text">
          {product?.discount > 0 ? (
            <div className="d-flex align-items-center justify-content-center gap-3">
              <span className="fw-semibold">
                $
                {(
                  product.price -
                  (product.price * product.discount) / 100
                ).toFixed(2)}
              </span>
              <span className="color-old-price text-decoration-line-through">
                ${product?.price}
              </span>
            </div>
          ) : (
            <span className="fw-semibold">${product?.price}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;