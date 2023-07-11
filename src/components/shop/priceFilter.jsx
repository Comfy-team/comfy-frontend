import { useEffect, useState } from "react";

// component
import FilterTitle from "./filterTitle";

// style
import style from "../../pages/shop/shop.module.css";

const PriceFilter = ({ min, max, value, onFilter }) => {
  const [minTooClose, setMinTooClose] = useState(false);
  const [maxTooClose, setMaxTooClose] = useState(true);
  const [step, setStep] = useState(50);

  useEffect(() => {
    if (value <= min + 250) {
      setMinTooClose(true);
      setMaxTooClose(false);
    } else if (value >= max - 250) {
      setMaxTooClose(true);
      setMinTooClose(false);
    } else {
      setMaxTooClose(false);
      setMinTooClose(false);
    }
    const step = (max - min) / 20;
    setStep(step);
  }, [value, min, max]);

  return (
    <div className="filter price-filter position-relative mb-4 mb-md-0">
      <span className="position-absolute start-0 top-100 pt-2">
        {min}${minTooClose && `-${Math.floor(value)}$`}
      </span>
      <span className="position-absolute end-0 top-100 pt-2">
        {maxTooClose && `${Math.floor(value)}$-`}
        {value < max ? max : Math.floor(value)}$
      </span>
      {!minTooClose && !maxTooClose ? (
        <span
          className={`position-absolute ${style["price-value"]} top-100 pt-2`}
          style={{
            left: `${Math.floor(((value - min) * 100) / (max - min))}%`,
          }}
        >
          {Math.floor(value)}$
        </span>
      ) : (
        ""
      )}
      <FilterTitle name="price" />
      <input
        type="range"
        className="d-block w-100"
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={(e) => onFilter(+e.target.value)}
        style={{
          backgroundSize: `${Math.floor(((value - min) * 100) / (max - min))}%`,
        }}
      />
    </div>
  );
};

export default PriceFilter;
