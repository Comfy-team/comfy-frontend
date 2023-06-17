import { useEffect, useState } from "react";
import { NavLink} from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
//components
import { LeftArrow, RightArrow } from "./../common/customSliderArrows";
//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import styles from "./../../pages/home/home.module.css";
import axiosInstance from "../../apis/config";
import ProductCard from './../common/productCard';

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
    breakpoint: { max: 1023, min: 768 },
    items: 3,
    partialVisibilityGutter: 40,
  },
  small: {
    breakpoint: { max: 767, min: 481 },
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

  useEffect(() => {
    axiosInstance
      .get("/products", {
        params: {
          page: 1,
          brand: "all",
          category: "all",
          sort: 0,
          price: 0,
        },
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
                "small",
                "extraSmall",
                "extraExtraSmall",
              ]}
              customRightArrow={<RightArrow />}
              customLeftArrow={<LeftArrow />}
            >
              {product.map((product) => {

                
                return (
                  <div key={product._id} className="pe-4">
                  <ProductCard product={product} />
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
