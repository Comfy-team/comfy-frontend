import { useState } from "react";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// style
import style from "../../../pages/dashboard/dashboard.module.css";

const ProductColor = ({
  color,
  onDelete,
  onUpdateStock,
  stockError,
  onStockError,
}) => {
  const [error, seterror] = useState(false);

  const handleStockChange = (stock) => {
    onUpdateStock(stock);
    if (stock < 1 || Math.floor(stock) !== stock) {
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
          min={1}
          className={`form-control flex-fill ${style["dash-prod-color-stock"]} ${
            error ? "is-invalid" : ""
          }`}
          value={color.stock}
          onChange={(e) => {
            handleStockChange(+e.target.value);
          }}
        />
        <button
          type="button"
          className="text-danger btn p-0 outline-0 border-0"
          onClick={onDelete}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      {error && (
        <p className="invalid-feedback d-block">
          stock should be an integer larger than 0
        </p>
      )}
    </div>
  );
};

export default ProductColor;
