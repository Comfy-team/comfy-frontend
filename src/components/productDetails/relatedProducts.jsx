import { useState } from "react";

// react multi carousel
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// components
import { LeftArrow, RightArrow } from "../common/customSliderArrows";
import ProductCard from "../common/productCard";
import { useSelector } from "react-redux";

// React multi-carousel breakpoints
const responsive = {
  large: {
    breakpoint: { max: 4000, min: 1024 },
    items: 4,
  },
  medium: {
    breakpoint: { max: 1023, min: 768 },
    items: 3,
    partialVisibilityGutter: 20,
  },
  small: {
    breakpoint: { max: 767, min: 481 },
    items: 2,
    partialVisibilityGutter: 50,
  },
  extraSmall: {
    breakpoint: { max: 480, min: 0 },
    items: 1,
    partialVisibilityGutter: 80,
  },
};

const RelatedProducts = ({ data }) => {
  const [isDragged, setIsdragged] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const cart = useSelector((state) => state.cart.cart);

  // Disable link pointer events if it's being dragged
  const handleDrag = () => {
    if (!isMouseDown) {
      if (isDragged) setIsdragged(false);
      return;
    }
    setIsdragged(true);
  };

  return data ? (
    <div className="py-5">
      <h2 className="text-center my-4">Related Products</h2>
      <div
        className="ps-3"
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
          {data.map((product) => {
            const inCart = cart.items
              ? cart.items.findIndex((ele) => ele.product_id === product._id) === -1
                ? false
                : true
              : false;
            return (
              <div
                key={product._id}
                className="pe-3"
                onMouseDown={() => setIsMouseDown(true)}
                onMouseMove={handleDrag}
              >
                <ProductCard product={product} inCart={inCart} />
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  ) : (
    ""
  );
};

export default RelatedProducts;
