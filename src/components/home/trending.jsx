import { useEffect, useState } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// components
import { LeftArrow, RightArrow } from "./../common/customSliderArrows";
import axiosInstance from "../../apis/config";
import ProductCard from "./../common/productCard";
import Spinner from "../common/spinner";

// style
import styles from "./../../pages/home/home.module.css";

// React multi-carousel breakpoints
const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 1200 },
    items: 4,
  },
  large: {
    breakpoint: { max: 1199, min: 1024 },
    items: 4,
  },
  medium: {
    breakpoint: { max: 1023, min: 992 },
    items: 3,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 991, min: 481 },
    items: 2,
    partialVisibilityGutter: 40,
  },
  extraSmall: {
    breakpoint: { max: 480, min: 375 },
    items: 1,
    partialVisibilityGutter: 50,
  },
  extraExtraSmall: {
    breakpoint: { max: 374, min: 0 },
    items: 1,
    partialVisibilityGutter: 40,
  },
};

const Trending = () => {
  const [product, setProduct] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);
  
  useEffect(() => {
    setShowSpinner(true);
    axiosInstance
      .get("/products", {})
      .then((response) => {
        setProduct(response.data.data);
        setShowSpinner(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className={`${styles.trendingSection}`}>
        <h2 className="text-center">Top Trending</h2>
        {!showSpinner ? (
        <div className="container-fluid px-md-5">
          <div className={`row justify-contant-between`}>
            <Carousel
              responsive={responsive}
              containerClass="multi-carousel"
              draggable
              swipeable
              partialVisible
              infinite
              keyBoardControl
              minimumTouchDrag={80}
              removeArrowOnDeviceType={[
                "medium",
                "tablet",
                "extraSmall",
                "extraExtraSmall",
              ]}
              customRightArrow={<RightArrow />}
              customLeftArrow={<LeftArrow />}
            >
              {product.map((product) => (
                <div key={product._id} className="pe-4">
                  <ProductCard product={product} />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default Trending;
