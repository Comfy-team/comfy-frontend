import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import ecoFriendly from "./../../assets/brands-categories/eco-friendly.jpg";
import outDoor from "./../../assets/brands-categories/luxury.jpg";

import styles from "./../../pages/home/home.module.css";
const BrandCategories = () => {
  return (
    <>
      <div className={`row ${styles.brandCategory}`}>
        <div
          className={`col-10 col-lg-5 ${styles.modifyImage}`}
          style={{ backgroundImage: `url(${ecoFriendly})` }}
        >
          <div className={styles.content}>
            <h4>mid-season</h4>
            <h3>Eco-Friendly</h3>
            <Link to="/shop" className="text-decoration-none cursor-pointer">
              <p>
                Shop now{" "}
                <span className="ms-2">
                  <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </p>
            </Link>
          </div>
        </div>
        <div
          className={`col-10 col-lg-5 ${styles.modifyImage}`}
          style={{ backgroundImage: `url(${outDoor})` }}
        ><div className={styles.content}>
          <h4>top trending</h4>
          <h3>Outdoor</h3>
          <Link to="/shop" className="text-decoration-none cursor-pointer">
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
    </>
  );
};

export default BrandCategories;
