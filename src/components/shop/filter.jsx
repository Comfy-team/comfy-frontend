// style
import style from "../../pages/shop/shop.module.css";
import FilterTitle from "./filterTitle";

const Filter = ({ data, name, active, onFilter }) => {
  return (
    <div className="filter mb-5">
      <FilterTitle name={name} />
        <div className="form-check mb-3">
          <input
            className={`form-check-input ${style["form-check-input"]}`}
            type="radio"
            name={name}
            value="all"
            id={`all-${name}`}
            checked={active === "all" ? true : false}
            onChange={(e) => onFilter(e.target.value)}
          />
          <label
            className="form-check-label color-main-gray text-capitalize"
            htmlFor={`all-${name}`}
          >
            All {name}
          </label>
        </div>
        {data.map((ele) => (
          <div key={ele._id} className="form-check mb-3">
            <input
              className={`form-check-input ${style["form-check-input"]}`}
              type="radio"
              name={name}
              value={ele._id}
              id={ele._id}
              checked={active === ele._id ? true : false}
              onChange={(e) => onFilter(e.target.value)}
            />
            <label
              className="form-check-label text-capitalize color-main-gray"
              htmlFor={ele._id}
            >
              {ele.name}
            </label>
          </div>
        ))}
    </div>
  );
};

export default Filter;
