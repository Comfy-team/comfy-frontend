// style
import style from "../../pages/productDetails/productDetails.module.css";

const Colors = ({ colors, active, onColorChange }) => {
  return (
    <div className="d-flex align-items-center gap-2">
      {colors.map((ele) => (
        <span
          key={ele._id}
          className={`${style["color-choice"]} ${
            ele._id === active?._id && style.active
          } d-inline-block rounded-circle border border-2 border-white`}
          style={{ backgroundColor: ele.color }}
          onClick={() => onColorChange(ele)}
        ></span>
      ))}
    </div>
  );
};

export default Colors;
