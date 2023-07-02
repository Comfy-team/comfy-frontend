// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// style
import style from "../../../pages/dashboard/dashboard.module.css";

const ProductColor = ({ color, onDelete }) => {
  return (
    <div className="position-relative">
      <div
        className={`${style["dash-prod-form-clr"]} border border-2 rounded-circle`}
        style={{
          backgroundColor: color,
        }}
      ></div>
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

export default ProductColor;
