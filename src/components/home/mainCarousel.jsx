import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// style
import  styles  from "./../../pages/home/home.module.css"

// images
import homeSlider1 from "../../assets/home-slider/slide-1.jpg";
import homeSlider3 from "../../assets/home-slider/slide-3.jpg";
import homeSlider2 from "../../assets/home-slider/slide-2.jpg";

const MainCarousel = () => {

    const HomImgs = [
        {
          id: 1,
          src: homeSlider1,
          content: "Outdoor Wicker Hanging Chair",
          discount: 50,
        },
        {
          id: 2,
          src: homeSlider2,
          content: "Ray Pendant Lamp Choose Your Comfort",
          discount: 70,
        },
        {
          id: 3,
          src: homeSlider3,
          content: "Nano Tube Suspension Pendant Lamp",
          discount: 10,
        },
      ];

    return (
    <> 

    <Carousel fade className={styles["carousel-indicators"]}>
      {HomImgs.map((img) => (
        <Carousel.Item key={img.id} className={`${styles["carousel-item"]}`} >
        <img 
        className={`d-block w-100 h-100 ${styles.carouselImage}`}
         src={img.src} alt={img.content}
        />
          <Carousel.Caption className={`${styles["carousel-caption"]}`}>
            <div className={`${styles.captionCarouel}` }>
            <div className="row">
            <p className={`col-5 col-md-3 col-lg-2  ${styles.discount}`}>Up to {img.discount}% OFF</p>
            </div>
            <div className="row">
            <h3 className="col-10 col-md-6 col-xl-8">{img.content}</h3>
            </div>
            <Link to="/shop" className="text-decoration-none cursor-pointer">
             <p className={styles.explore}> Explore Now  <span className="ms-2 "><FontAwesomeIcon icon={faArrowRight}/></span></p>
            </Link>
             </div>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
    </>  
    
    );
}
 
export default MainCarousel;