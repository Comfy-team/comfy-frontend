import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCartShopping } from "@fortawesome/free-solid-svg-icons";

// components
import { showCartModal } from "../../store/slices/cartModalSlice";

// functions
import { addItemToCart } from "../../functions/cart";

// style
import style from "../../pages/searchPage/searchPage.module.css";

const SearchCard = ({ product, query }) => {
  const [shownTitle, setShownTitle] = useState("");
  const [shownCategory, setShownCategory] = useState("");
  const [shownBrand, setShownBrand] = useState("");
  const [inCart, setInCart] = useState(false);
  const [showBtnSpinner, setShowBtnSpinner] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);
  const [activeColor, setActiveColor] = useState({});
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

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

  const handleAddToCart = () => {
    if (cart.items) {
      setShowBtnSpinner(true);
    }
    addItemToCart(cart._id, product._id, activeColor);
  };

  useEffect(() => {
    setShownTitle(highlightMatch(product.name, query));
    setShownCategory(
      highlightMatch(
        `${product.category.name[0].toUpperCase()}${product.category.name.slice(
          1
        )}`,
        query
      )
    );
    setShownBrand(highlightMatch(product.brand.name, query));
  }, [query]);

  useEffect(() => {
    setShowBtnSpinner(false);
    // check if product out of stock
    if (product.colors.every((obj) => obj.stock === 0)) {
      setOutOfStock(true);
    }
    // if not logged in or admin
    if (!cart.items) {
      setInCart(false);
      return;
    }
    // set first active color
    const activeColor = product.colors.find((obj) => obj.stock > 0);
    setActiveColor(activeColor.color);
    const productIndx = cart.items.findIndex(
      (ele) => ele.product_id._id === product._id
    );
    setInCart(productIndx === -1 ? false : true);
  }, [cart, product]);

  return (
    <>
      <div
        className={`${style["search-card"]} product-card card position-relative border-0 rounded-0`}
      >
        {outOfStock ? (
          <span className="badge d-block bg-yellow position-absolute text-white">
            Out Of Stock
          </span>
        ) : (
          product.discount > 0 && (
            <span className="badge d-block bg-yellow position-absolute text-white">
              -{product.discount}%
            </span>
          )
        )}
        <div className="position-relative overflow-hidden holder">
          <Link to={`/product-details/${product._id}`} className="d-block">
            <img
              src={process.env.REACT_APP_BASE_URL + "/" + product.images[0].src}
              alt={product.name}
              className="img-fluid card-img-top rounded-0"
            />
            <img
              src={
                product.images[1]
                  ? process.env.REACT_APP_BASE_URL + "/" + product.images[1].src
                  : process.env.REACT_APP_BASE_URL + "/" + product.images[0].src
              }
              alt={product.name}
              className="img-fluid card-img-top rounded-0 hover-img position-absolute w-100 h-100 top-0 start-0"
            />
          </Link>
          {!(outOfStock || cart.role === "admin") ? (
            showBtnSpinner ? (
              <button className="add-to-cart-btn btn btn-bg-white py-2 text-uppercase position-absolute fw-semibold d-flex justify-content-center align-items-center gap-2">
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </button>
            ) : inCart ? (
              <button
                className="add-to-cart-btn btn btn-bg-white py-2 text-uppercase position-absolute fw-semibold d-flex justify-content-center align-items-center gap-2"
                onClick={() => dispatch(showCartModal(true))}
              >
                <FontAwesomeIcon icon={faCartShopping} /> In Cart
              </button>
            ) : (
              <button
                className="add-to-cart-btn btn btn-bg-white py-2 text-uppercase position-absolute fw-semibold d-flex justify-content-center align-items-center gap-2"
                onClick={() => handleAddToCart()}
              >
                <FontAwesomeIcon icon={faPlus} /> Add to Cart
              </button>
            )
          ) : (
            ""
          )}
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
            <div className={`${style["extra-info"]} mt-1 fw-semibold`}>
              {shownCategory}, {shownBrand}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchCard;
