import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
//components
import { LeftArrow, RightArrow } from "./../common/customSliderArrows";
import axiosInstance from "../../apis/config";
import ProductCard from "./../common/productCard";

//style
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
  let [product, setProduct] = useState([]);
  const cart = useSelector((state) => state.cart.cart);
  useEffect(() => {
    axiosInstance
      .get("/products", {
      })
      .then((response) => {
        setProduct(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className={`${styles.trendingSection}`}>
        <h2 className="text-center">Top Trending</h2>
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
              {product.map((product) => {
                const inCart = cart.items
                  ? cart.items.findIndex(
                      (ele) => ele.product_id === product._id
                    ) === -1
                    ? false
                    : true
                  : false;

                return (
                  <div key={product._id} className="pe-4">
                    <ProductCard
                      product={product}
                      inCart={inCart}
                      cart={cart}
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trending;
