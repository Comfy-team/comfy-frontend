import { useState } from "react";
import { useSelector } from "react-redux";

// react multi carousel
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// components
import { LeftArrow, RightArrow } from "./customSliderArrows";
import Spinner from "./spinner";

// React multi-carousel breakpoints
const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 1200 },
    items: 5,
  },
  large: {
    breakpoint: { max: 1199, min: 1024 },
    items: 4,
  },
  medium: {
    breakpoint: { max: 1023, min: 768 },
    items: 3,
    partialVisibilityGutter: 40,
  },
  small: {
    breakpoint: { max: 767, min: 375 },
    items: 5,
  },
  extraSmall: {
    breakpoint: { max: 374, min: 0 },
    items: 2,
    partialVisibilityGutter: 30,
  },
};

const Brands = () => {
  const [isDragged, setIsdragged] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const brands = useSelector((state) => state.brands.brands);

  // Disable link pointer events if it's being dragged
  const handleDrag = () => {
    if (!isMouseDown) {
      if (isDragged) setIsdragged(false);
      return;
    }
    setIsdragged(true);
  };

  return brands.length > 0 ? (
    <section className="brands-slider py-5 ps-3 border border-start-0 border-end-0">
      <div
        className="py-3"
        onMouseLeave={() => setIsMouseDown(false)}
        onMouseUp={() => setIsMouseDown(false)}
      >
        <Carousel
          responsive={responsive}
          containerClass="multi-carousel"
          draggable
          swipeable
          partialVisible
          infinite
          keyBoardControl
          minimumTouchDrag={80}
          removeArrowOnDeviceType={["medium", "small", "extraSmall"]}
          customRightArrow={<RightArrow />}
          customLeftArrow={<LeftArrow />}
        >
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="logo-holder pe-3 py-3"
              onMouseDown={() => setIsMouseDown(true)}
              onMouseMove={handleDrag}
            >
              <img
                src={process.env.REACT_APP_BASE_URL + "/" + brand.image}
                alt={brand.name}
                className="d-block img-fluid"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  ) : (
    <Spinner />
  );
};

export default Brands;
