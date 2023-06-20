import { useEffect } from "react";

// react bootstrap
import Alert from "react-bootstrap/Alert";

// components
import { enableBodyScroll, disableBodyScroll } from "../../functions/global";

const RemoveProductWarning = ({ onRemove, onCancel }) => {
  useEffect(() => {
    disableBodyScroll();
    return enableBodyScroll;
  }, []);

  return (
    <div className="delete-alert position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50">
      <Alert
        className="position-absolute top-50 start-50 translate-middle z-2 p-3 py-4"
        variant="secondary"
        onClose={onCancel}
        dismissible
      >
        <div className="px-3 pt-4">
          <p> Are you sure you want to remove from cart?</p>
          <div className="d-flex justify-content-center gap-2">
            <button
              type="button"
              className="btn btn-bg-dark text-white"
              onClick={onRemove}
            >
              remove
            </button>
            <button
              type="button"
              className="btn btn-bg-dark text-white"
              onClick={onCancel}
            >
              cancel
            </button>
          </div>
        </div>
      </Alert>
    </div>
  );
};

export default RemoveProductWarning;
