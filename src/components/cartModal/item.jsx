// React imports
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Font Awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

// Local imports
import { deleteItemFromCart, updateItemQuantity } from "../../functions/cart.js";
import { showCartModal } from "../../store/slices/cartModalSlice.js";
import RemoveProductWarning from "../common/removeProductWarning";

// Styles
import style from "./cartModal.module.css";

function Item({ item, cartId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showBtnSpinner, setBtnSpinner] = useState(false); // initialize showBtnSpinner to false
  const [showWarning, setShowWarning] = useState(false);

  const handleCloseCart = () => {
    navigate(`/product-details/${item?.product_id._id}`);
    dispatch(showCartModal(false));
  };

  const handleDelete = () => {
    setBtnSpinner(true); // show spinner
    deleteItemFromCart(cartId, item?.product_id?._id, item.color).then(() => {
      setBtnSpinner(false); // hide spinner
      setShowWarning(false);
    });
  };

  return (
    <div className="py-2">
      <div className="row">
        <div className="col-4">
          <img
            src={
              process.env.REACT_APP_BASE_URL +
              "/" +
              item?.product_id?.images[0].src
            }
            alt={item?.name}
            className=" w-100 h-70"
          />
        </div>
        <div className="col-8 ">
          <Link
            to={`/product-details/${item?.product_id._id}`}
            className="text-decoration-none text-dark"
            onClick={handleCloseCart}
            title={`Click to show details for ${item?.product_id.name}`}
          >
            <strong className="d-block text-truncate hover-color-yellow">
              {item?.product_id.name}
            </strong>
          </Link>

          <div className="row">
            <div className="col-6">
              {item?.color && (
                <strong className="d-flex">
                  Color:{" "}
                  <div
                    style={{ backgroundColor: `${item.color}` }}
                    className={`${style.spanColor} rounded-circle ms-2 border-dark border-1`}
                  ></div>
                </strong>
              )}
              <div className="py-1">
                <span className="fw-semibold">Stock:</span>
                <span
                  className={
                    item.product_id.stock === 0 ? "text-danger" : ""
                  }
                >
                  {item.product_id.stock > 0
                    ? item.product_id.stock
                    : "Out Of Stock"}
                </span>
              </div>
              <strong className="d-block">${item?.price}</strong>
              <div className="d-flex pt-2">
                {showBtnSpinner ? (
                  <div
                    className="spinner-border spinner-border-sm text-dark me-2"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    onClick={() => setShowWarning(true)}
                    type="button"
                    size="sm"
                  />
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="input-group justify-content-center w-100">
                <button
                  className="btn  rounded-0 border-light"
                  type="button"
                  onClick={() =>
                    updateItemQuantity(
                      cartId,
                      item?.product_id._id,
                      item.quantity - 1,
                      item.color
                    )
                  }
                  disabled={item.quantity === 1}
                >
                  <FontAwesomeIcon icon={faMinus} size="xs" />
                </button>
                <p className={`m-0 p-2`}>{item?.quantity}</p>
                <button
                  className="btn rounded-0 border-light"
                  type="button"
                  onClick={() =>
                    updateItemQuantity(
                      cartId,
                      item?.product_id._id,
                      item.quantity + 1,
                      item.color
                    )
                  }
                  disabled={item.quantity === item.product_id.stock}
                >
                  <FontAwesomeIcon icon={faPlus} size="xs" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showWarning && (
        <RemoveProductWarning
          onRemove={handleDelete}
          onCancel={() => setShowWarning(false)}
        />
      )}
    </div>
  );
}
export default Item;
