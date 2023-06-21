import { useState } from "react";
import { Link } from "react-router-dom";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// functions
import { deleteItemFromCart, addItemToCart } from "../../functions/cart";
import RemoveProductWarning from "./removeProductWarning";

const ProductCard = ({ product, inCart, cart }) => {
  const [showWarning, setShowWarning] = useState(false);

  const handleDeleteFromCart = () => {
    deleteItemFromCart(cart._id, product._id);
    setShowWarning(false);
  };

  const handleAddToCart = (id, color, price) => {
    addItemToCart(cart._id, id, color, price);
  };

  return (
    <>
      <div className="product-card card position-relative border-0 rounded-0">
        {product.stock === 0 ? (
          <span className="badge d-block bg-yellow position-absolute text-white">
            Out Of Stock
          </span>
        ) : product.discount > 0 ? (
          <span className="badge d-block bg-yellow position-absolute text-white">
            -{product.discount}%
          </span>
        ) : (
          ""
        )}
        <div className="holder position-relative overflow-hidden">
          <Link to={`/product-details/${product._id}`} className="d-block">
            <img
              src={process.env.REACT_APP_BASE_URL + "/" + product.images[0].src}
              alt={product.name}
              className="img-fluid card-img-top rounded-0"
            />
            <img
              src={process.env.REACT_APP_BASE_URL + "/" + product.images[1].src}
              alt={product.name}
              className="img-fluid card-img-top rounded-0 hover-img position-absolute w-100 h-100 top-0 start-0"
            />
          </Link>
          {inCart ? (
            <button
              className="add-to-cart-btn btn btn-bg-white py-2 text-uppercase position-absolute fw-semibold d-flex justify-content-center align-items-center gap-2"
              onClick={() => setShowWarning(true)}
            >
              Remove from Cart
            </button>
          ) : (
            <button
              className="add-to-cart-btn btn btn-bg-white py-2 text-uppercase position-absolute fw-semibold d-flex justify-content-center align-items-center gap-2"
              onClick={() =>
                handleAddToCart(product._id, product.colors[0], product.price)
              }
              disabled={product.stock > 0 ? false : true}
            >
              <FontAwesomeIcon icon={faPlus} /> Add to Cart
            </button>
          )}
        </div>
        <div className="card-body text-center">
          <h3 className="h6 fw-bold card-title">
            <Link
              className="d-block text-ellipsis text-decoration-none hover-color-yellow color-product-name"
              to={`/product-details/${product._id}`}
            >
              {product.name}
            </Link>
          </h3>
          <div className="card-text">
            {product.discount > 0 ? (
              <div className="d-flex align-items-center justify-content-center gap-3">
                <span className="fw-semibold">
                  $
                  {(
                    product.price -
                    (product.price * product.discount) / 100
                  ).toFixed(2)}
                </span>
                <span className="color-old-price text-decoration-line-through">
                  ${product.price}
                </span>
              </div>
            ) : (
              <span className="fw-semibold">${product.price}</span>
            )}
          </div>
        </div>
      </div>
      {showWarning && (
        <RemoveProductWarning
          onRemove={handleDeleteFromCart}
          onCancel={() => setShowWarning(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
