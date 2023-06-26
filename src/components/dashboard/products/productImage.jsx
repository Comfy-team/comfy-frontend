// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// style
import style from "../../../pages/dashboard/dashboard.module.css";

const ProductImage = ({ src, productName, onDelete }) => {
  return (
    <div className="position-relative">
      <img
        src={src}
        alt={productName}
        className={`${style["dash-prod-form-img"]} img-fluid border`}
      />
      <button
        type="button"
        className="text-danger btn p-0 outline-0 border-0 position-absolute top-0 end-0"
        onClick={onDelete}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};

export default ProductImage;
