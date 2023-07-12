import { useState } from "react";

import Carousel from "react-bootstrap/Carousel";

// components
import Spinner from "../common/spinner";

// style
import style from "../../pages/productDetails/productDetails.module.css";

const FullScreenCarousel = ({ imgs, alt }) => {
  const [index, setIndex] = useState(1);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return imgs ? (
    <Carousel
      className={`${style["fullscreen-carousel"]} h-100 d-flex align-items-center justify-content-center`}
      activeIndex={index}
      onSelect={handleSelect}
      touch={true}
      data-bs-theme="dark"
    >
      {imgs.map((img, indx) => (
        <Carousel.Item key={img._id}>
          <img
            className={`${style["carousel-img"]} d-block img-fluid mx-auto`}
            src={process.env.REACT_APP_BASE_URL + "/" + img.src}
            alt={`${alt} - img ${indx}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  ) : (
    <Spinner />
  );
};

export default FullScreenCarousel;
