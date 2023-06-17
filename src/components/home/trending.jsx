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
    breakpoint: { max: 767, min: 481 },
    items: 2,
    partialVisibilityGutter: 40,
  },
  extraSmall: {
    breakpoint: { max: 480, min: 375 },
    items: 2,
    partialVisibilityGutter: 40,
  },
  extraExtraSmall: {
    breakpoint: { max: 374, min: 0 },
    items: 2,
    partialVisibilityGutter: 30,
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
        <div className="container">
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
                  <div
                  key={product._id}
                    className={`product-card card position-relative border-0 col-10 rounded-0 ${styles["productCard"]}`}
                  >
                    {product?.discount > 0 && (
                      <span className="badge d-block bg-yellow position-absolute text-white">
                        -{product.discount}%
                      </span>
                    )}
                    <NavLink
                      to={`/product-details/${product._id}`}
                      className="holder position-relative overflow-hidden"
                    >
                      <img
                        src={
                          process.env.REACT_APP_BASE_URL +
                          "/" +
                          product?.images[0].src
                        }
                        alt={product?.name}
                        className="img-fluid card-img-top rounded-0"
                      />
                      <img
                        src={
                          process.env.REACT_APP_BASE_URL +
                          "/" +
                          product?.images[1].src
                        }
                        alt={product?.name}
                        className="img-fluid card-img-top rounded-0 hover-img position-absolute w-100 h-100 top-0 start-0"
                      />
                      <button
                        className={`hover-img position-absolute ${styles.addCardButton}`}
                      >
                        <FontAwesomeIcon icon={faPlus} /> Add to cart
                      </button>
                    </NavLink>
                    <div className="card-body text-center">
                      <h3 className="h6 fw-bold card-title">
                        <NavLink
                          className="d-block text-ellipsis text-decoration-none hover-color-yellow color-product-name"
                          to={`/product-details/${product._id}`}
                        >
                          {product?.name}
                        </NavLink>
                      </h3>
                      <div className="card-text">
                        {product?.discount > 0 ? (
                          <div className="d-flex align-items-center justify-content-center gap-3">
                            <span className="fw-semibold">
                              $
                              {(
                                product.price -
                                (product.price * product.discount) / 100
                              ).toFixed(2)}
                            </span>
                            <span className="color-old-price text-decoration-line-through">
                              ${product?.price}
                            </span>
                          </div>
                        ) : (
                          <span className="fw-semibold">${product?.price}</span>
                        )}
                      </div>
                    </div>
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
