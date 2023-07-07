import { useState } from "react";
import { NavLink } from "react-router-dom";

// react multi carousel
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

// components
import { LeftArrow, RightArrow } from "./customSliderArrows";
import InstaPost from "./instaPost";

// imported assets
import post1 from "../../assets/instagram/insta-1.jpg";
import post2 from "../../assets/instagram/insta-2.jpg";
import post3 from "../../assets/instagram/insta-3.jpg";
import post4 from "../../assets/instagram/insta-4.jpg";
import post5 from "../../assets/instagram/insta-5.jpg";
import post6 from "../../assets/instagram/insta-6.jpg";
import post7 from "../../assets/instagram/insta-7.jpg";

const posts = [
  { id: 0, src: post1, link: "https://www.instagram.com/comfy_store4/" },
  {
    id: 1,
    src: post2,
    link: "https://www.instagram.com/p/CtzFxFTIrsG/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==",
  },
  {
    id: 2,
    src: post3,
    link: "https://www.instagram.com/p/CtzFkJMoQST/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==",
  },
  {
    id: 3,
    src: post4,
    link: "https://www.instagram.com/p/CtzGEPAocCz/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==",
  },
  {
    id: 4,
    src: post5,
    link: "https://www.instagram.com/p/CtzFWORo-Yx/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==",
  },
  {
    id: 5,
    src: post6,
    link: "https://www.instagram.com/p/CtzFFLroLTA/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==",
  },
  {
    id: 6,
    src: post7,
    link: "https://www.instagram.com/p/CtzE_D0Ir9g/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==",
  },
];

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

const FollowUs = () => {
  const [isDragged, setIsdragged] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Disable link pointer events if it's being dragged
  const handleDrag = () => {
    if (!isMouseDown) {
      if (isDragged) setIsdragged(false);
      return;
    }
    setIsdragged(true);
  };

  return (
    <section className="insta-posts py-5 ps-3">
      <h2 className="h2 fw-bolder text-center text-capitalize mb-4 py-3 pe-3">
        @Comfy! Follow us on Instagram
      </h2>
      <div
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
          {posts.map((post) => (
            <div
              key={post.id}
              className={`link-holder pe-3`}
              onMouseDown={() => setIsMouseDown(true)}
              onMouseMove={handleDrag}
            >
              <NavLink
                to={post.link}
                className={`post ${
                  isDragged && isMouseDown ? "dragged" : ""
                } d-block text-decoration-none overflow-hidden position-relative`}
                style={{ minHeight: "200px" }}
              >
                <InstaPost src={post.src} />
                <div className="icon-holder w-100 h-100 position-absolute top-0 start-0 text-white d-flex justify-content-center align-items-center fs-2">
                  <FontAwesomeIcon icon={faInstagram} />
                </div>
              </NavLink>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default FollowUs;
