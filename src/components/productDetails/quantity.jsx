// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faSquareMinus } from "@fortawesome/free-solid-svg-icons";

const Quantity = ({
  active,
  stock,
  onQuantityChange,
  onDeleteItem,
  showBtnSpinner,
}) => {
  return (
    <div className="d-flex justify-content-center align-items-center gap-3">
      <button
        type="button"
        className="btn fs-4 p-0 border-0 outline-0 color-main-black hover-color-yellow"
        disabled={active === 0 || stock === 0 || showBtnSpinner ? true : false}
        onClick={() =>
          active === 1 ? onDeleteItem() : onQuantityChange(active - 1)
        }
      >
        <FontAwesomeIcon icon={faSquareMinus} />
        <span aria-hidden className="visually-hidden">
          decrease
        </span>
      </button>
      {showBtnSpinner ? (
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className={`fs-4 ${active > stock ? "text-danger" : ""}`}>{`${
          active < 10 ? "0" : ""
        }${active}`}</div>
      )}
      <button
        type="button"
        className="btn fs-4 p-0 border-0 outline-0 color-main-black hover-color-yellow"
        disabled={
          active >= stock || stock === 0 || showBtnSpinner ? true : false
        }
        onClick={() => onQuantityChange(active + 1)}
      >
        <FontAwesomeIcon icon={faSquarePlus} />
        <span aria-hidden className="visually-hidden">
          increase
        </span>
      </button>
    </div>
  );
};

export default Quantity;
