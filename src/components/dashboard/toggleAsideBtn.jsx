// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

// style
import style from "../../pages/dashboard/dashboard.module.css";

const ToggleAsideBtn = ({ onToggleAside, collapsed }) => {
  return (
    <button
      className={`${style["toggle-aside-btn"]} ${
        collapsed ? style["collapsed"] : ""
      } btn ${
        style["dash-btn"]
      } rounded-circle p-0 text-white position-absolute end-0`}
      onClick={onToggleAside}
    >
      <FontAwesomeIcon icon={faAngleLeft} />
    </button>
  );
};

export default ToggleAsideBtn;
