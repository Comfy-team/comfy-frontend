import { Link } from "react-router-dom";

import homeSlider1 from "../../assets/home-slider/slide-1.jpg";
import homeSlider3 from "../../assets/home-slider/slide-3.jpg";
import homeSlider2 from "../../assets/home-slider/slide-2.jpg";
// import { Carousel } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

import "./pageHeader.css";

const HomImgs = [
  {
    id: 0,
    src: homeSlider1,
    content: "Outdoor Wicker Hanging Chair",
    discound: 50,
  },
  {
    id: 1,
    src: homeSlider2,
    content: "ray pendant lamp choose your comfort",
    discound: 70,
  },
  {
    id: 2,
    src: homeSlider3,
    content: "nano tube suspension pendant lamp",
    discound: 10,
  },
];

const PageHeader = () => {
  return (
    <div className="  headerPage  ">
      <Carousel className=" headerCarusel  mb-0">
        {HomImgs.map(img => (
          <Carousel.Item className=" headerCarusel-Item ">
            <img
              className="d-block w-100 h-100"
              src={img.src}
              alt="First slide"
            />
            <Carousel.Caption
              className="captionContainer mb-5 h-50  p-2 d-flex align-items-center"
              style={{
                height: "30rem",
                color: "black",
                faWeight: "500",
                width: "50%",
              }}
            >
              <div className="content  h-100 w-100">
                <span
                  style={{
                    width: "150px",
                    background: "brown",
                    color: "white",
                    position: "absolute",
                    top: "0%",
                    borderRadius: "8px",
                    left: "10px",
                  }}
                >
                  {" "}
                  UP TO {img.discound}% OFF
                </span>
                <h3
                  className=" text align-self-lg-end  mb-5 mt-5 "
                  style={{
                    fontSize: "2.1rem",
                  }}
                >
                  {img.content}
                </h3>
                <Link
                  to="/"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    alignContent: "left",
                    position: "absolute",
                    bottom: "10px",
                    left: "5px",
                    borderRadius: "8px",
                  }}
                >
                  Explore Now {`>`}
                </Link>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default PageHeader;
