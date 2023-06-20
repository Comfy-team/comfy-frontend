import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// font awesome
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import { addItemToCart, deleteItemFromCart } from "../../functions/cart";

// style
import style from "../../pages/searchPage/searchPage.module.css";

const SearchCard = ({ product, cartId, inCart, query }) => {
  const [shownTitle, setShownTitle] = useState("");
  const [shownCategory, setShownCategory] = useState("");
  const [shownBrand, setShownBrand] = useState("");

  const highlightMatch = (name, query) => {
    const regex = new RegExp(query, "i");
    const destructuredName = name.split(regex);
    const highlighted = destructuredName.map((piece, indx, arr) => {
      if (indx < arr.length - 1) {
        return (
          <span key={indx}>
            {piece}
            <span
              className={`bg-yellow ${
                indx === 0 && piece === "" ? "text-capitalize" : ""
              } p-0`}
            >
              {query}
            </span>
          </span>
        );
      }
      return <span key={indx}>{piece}</span>;
    });
    return highlighted;
  };

  const handleAddToCart = (cartId, id, color, price) => {
    addItemToCart(cartId, id, color, price);
  };

  const handleDeleteFromCart = (cartId, id) => {
    deleteItemFromCart(cartId, id);
  };

  useEffect(() => {
    setShownTitle(highlightMatch(product.name, query));
    setShownCategory(
      highlightMatch(
        `${product.category.name[0].toUpperCase()}${product.category.name.slice(1)}`,
        query
      )
    );
    setShownBrand(highlightMatch(product.brand.name, query));
  }, [query]);

  return (
    <div
      className={`${style["search-card"]} product-card card position-relative border-0 rounded-0`}
    >
      {product.discount > 0 && (
        <span className="badge d-block bg-yellow position-absolute text-white">
          -{product.discount}%
        </span>
      )}
      <div className="position-relative overflow-hidden holder">
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
        <button
          type="button"
          className={`${style["add-to-cart-btn"]} btn btn-bg-white py-2 text-uppercase position-absolute fw-semibold d-flex justify-content-center align-items-center gap-2`}
          onClick={() =>
            !inCart
              ? handleAddToCart(
                  cartId,
                  product._id,
                  product.colors[0].color,
                  product.price
                )
              : handleDeleteFromCart(cartId, product._id)
          }
        >
          {inCart ? (
            "in cart"
          ) : (
            <>
              <FontAwesomeIcon icon={faPlus} /> <span>add to cart</span>
            </>
          )}
        </button>
      </div>
      <div className="card-body text-center">
        <h3 className="h6 fw-bold card-title">
          <Link
            title={product.name}
            className={`${style.title} overflow-hidden d-block text-ellipsis text-decoration-none hover-color-yellow color-product-name`}
            to={`/product-details/${product._id}`}
          >
            {shownTitle}
          </Link>
        </h3>
        <div className="card-text">
          {product.discount > 0 ? (
            <div className="d-flex align-items-center justify-content-center gap-2">
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
          <div className={`${style["extra-info"]} mt-2 fw-semibold`}>
            {shownCategory}, {shownBrand}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
