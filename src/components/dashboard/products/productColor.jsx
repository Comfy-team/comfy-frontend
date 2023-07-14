import { useState } from "react";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// components
import ConfirmPopup from "./../../common/confirmPopup";

// style
import style from "../../../pages/dashboard/dashboard.module.css";

const ProductColor = ({ color, onDelete, onUpdateStock, onStockError }) => {
  const [error, seterror] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleStockChange = (stock) => {
    onUpdateStock(stock);
    if (stock < 0 || Math.floor(stock) !== stock) {
      onStockError(true);
      seterror(true);
    } else {
      onStockError(false);
      seterror(false);
    }
  };

  return (
    <div>
      <div className="p-2 d-flex gap-2 align-items-center border rounded-3">
        <div
          className={`${style["dash-prod-form-clr"]} border border-2 rounded-circle`}
          style={{
            backgroundColor: color.color,
          }}
        ></div>
        <input
          type="number"
          min={0}
          name="stock"
          className={`form-control flex-fill ${
            style["dash-prod-color-stock"]
          } ${error ? "is-invalid" : ""}`}
          value={color.stock}
          onChange={(e) => {
            handleStockChange(+e.target.value);
          }}
        />
        <button
          type="button"
          className="text-danger btn p-0 outline-0 border-0"
          onClick={() => setShowWarning(true)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      {error && (
        <p className="invalid-feedback d-block">
          stock should be an integer larger than 0
        </p>
      )}
      {showWarning && (
        <ConfirmPopup
          msg={`Are you sure you want to remove color?`}
          onConfirm={() => {
            onDelete();
            setShowWarning(false);
          }}
          onCancel={() => setShowWarning(false)}
        />
      )}
    </div>
  );
};

export default ProductColor;
