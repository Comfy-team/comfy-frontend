import { useState } from "react";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// components
import ConfirmPopup from "../../common/confirmPopup";

// style
import style from "../../../pages/dashboard/dashboard.module.css";

const ProductImage = ({ src, productName, onDelete }) => {
  const [showWarning, setShowWarning] = useState(false);

  return (
    <>
      <div className="position-relative">
        <img
          src={src}
          alt={productName}
          className={`${style["dash-prod-form-img"]} img-fluid border`}
        />
        <button
          type="button"
          className="text-danger btn p-0 outline-0 border-0 position-absolute top-0 end-0"
          onClick={() => setShowWarning(true)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      {showWarning && (
        <ConfirmPopup
          msg={`Are you sure you want to remove image?`}
          onConfirm={() => {
            onDelete();
            setShowWarning(false);
          }}
          onCancel={() => setShowWarning(false)}
        />
      )}
    </>
  );
};

export default ProductImage;
