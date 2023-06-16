// style
import style from "../../pages/shop/shop.module.css";

const FilterTitle = ({ name }) => {
  return (
    <h2 className={`h5 ${style.title} border-bottom w-100 mb-4`}>
      <span className="d-inline-block text-capitalize h-100 pb-3 position-relative">
        {name}
      </span>
    </h2>
  );
};

export default FilterTitle;
