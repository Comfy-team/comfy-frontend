import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { deleteItemFromCart } from "../../functions/cart";
const ProductCard = ({ product }) => {
  const [showButton, setShowButton] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [cart, setCart] = useState([]);

  const handleMouseEnter = () => {
    setShowButton(true);
  };

  const handleMouseLeave = () => {
    setShowButton(false);
  };
  const handleDeleteFromCart = (id) => {
    setInCart(false);
    deleteItemFromCart(cart._id, id);
  };

  const handleAddToCart = (event) => {
    setInCart(true);
    event.preventDefault();
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmlhbS5tLnIuYWxpQGdtYWlsLmNvbSIsImlkIjoiNjQ4ZjBjNzNlNzE1YTBmN2FjMjY1OGU4Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE2ODcyMTE5MDAsImV4cCI6MTY4NzIzMzUwMH0.JG5YXzvsf2SvjIoZYK2PcLXSqfGi__bRLySTx7EgoD4";
    fetch(`http://localhost:8080/cart/648f0c74e715a0f7ac2658ea`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        product_id: product._id,
        color: `${product.color}`, 
        price: product.price,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Product added to cart:", data);
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
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
        {/* {showButton && (
          <button disabled={inCart}
            className="btn btn-light w-75 p-3 border-0 addToCart-btn fw-bold position-absolute bottom-0 start-50 translate-middle"
            onClick={handleAddToCart}
          >
            <FontAwesomeIcon icon={faPlus} /> Add to Cart
          </button>
        )}
      {inCart && (
        <button onClick={handleDeleteFromCart}>
          Remove from Cart
        </button>
      )} */}
      {inCart ? (
          <button
            className="btn btn-light w-75 p-3 border-0 addToCart-btn fw-bold position-absolute bottom-0 start-50 translate-middle"
            onClick={() => handleDeleteFromCart(product?._id)}
          >
            Remove from Cart
          </button>
        ) : (
          <button
            className="btn btn-light w-75 p-3 border-0 addToCart-btn fw-bold position-absolute bottom-0 start-50 translate-middle"
            onClick={handleAddToCart}
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