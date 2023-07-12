import { Link } from "react-router-dom";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// style
import styles from "./../../pages/home/home.module.css";

// images
import ecoFriendly from "./../../assets/brands-categories/eco-friendly.jpg";
import outDoor from "./../../assets/brands-categories/luxury.jpg";

const BrandCategories = () => {
  return (
    <>
      <div className="container-fluid">
        <div className={`row mx-0 ${styles.brandCategory}`}>
          <div className={`col-12 col-md-6`}>
            <div
              className={`${styles.modifyImage} overflow-hidden position-relative d-flex justify-content-start align-items-center`}
            >
              <img
                src={ecoFriendly}
                alt="ecoFriendly"
                className={`position-absolute top-0 start-0 h-100 w-100 ${styles.brandImage}`}
              />

              <div className={styles.content}>
                <h4>mid-season</h4>
                <h3>Eco-Friendly</h3>
                <Link
                  to="/shop"
                  className="text-decoration-none cursor-pointer"
                >
                  <p>
                    Shop now{" "}
                    <span className="ms-2">
                      <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className={`col-12 col-md-6`}>
            <div
              className={`${styles.modifyImage} overflow-hidden position-relative d-flex justify-content-start align-items-center`}
            >
              <img
                src={outDoor}
                alt="outDoor"
                className={`position-absolute top-0 start-0 h-100 w-100 ${styles.brandImage}`}
              />

              <div className={styles.content}>
                <h4>top trending</h4>
                <h3>Outdoor</h3>
                <Link
                  to="/shop"
                  className="text-decoration-none cursor-pointer"
                >
                  <p>
                    Shop now{" "}
                    <span className="ms-2">
                      <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandCategories;
