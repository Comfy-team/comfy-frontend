import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./../../pages/home/home.module.css";
import axiosInstance from "./../../apis/config";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  // Remove the first category from the array
  const [
    firstCategory,
    secondCategory,
    thirdCategory,
    forthCategory,
    fifthCategory,
  ] = categories.slice(0, 5);

  useEffect(() => {
    axiosInstance
      .get("/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="container-fluid px-md-5 ">
        <div className={`row ${styles.gapColumn} ${styles.category}`}>
          <div className={`col-md-4 col-12 ${styles.itemOne}`}>
            {secondCategory && (
              <div className={`${styles.categoryItem} h-100 `}>
                <img
                    className={`${styles.categiryImage}`}
                  src={ 
                    process.env.REACT_APP_BASE_URL + "/" + secondCategory.image
                  }
                  alt={secondCategory.name}
                />
                <div className={styles.overlay}>
                  <p>{secondCategory.products_id.length} products</p>
                  <Link to={`/shop?category=${secondCategory._id}`} className={styles.categoryLink}>
                    <h2>{secondCategory.name}</h2>
                  </Link>
                  <Link to={`/shop?category=${secondCategory._id}`} className={styles.categoryLink}>
                    <h6>
                      Go Shopping{" "}
                      <span className="ms-2">
                        <FontAwesomeIcon icon={faArrowRight} />
                      </span>{" "}
                    </h6>
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className={`col-md-8 col-12 d-flex flex-column ${styles.gapColumn}`}>
            <div className={`row ${styles.gapColumn}`}>
              <div className={`col-md-5 col-12 ${styles.thirdItem}`}>
                {forthCategory && (
                  <div className={styles.categoryItem}>
                    <img
                      src={
                        process.env.REACT_APP_BASE_URL +
                        "/" +
                        forthCategory.image
                      }
                      alt={forthCategory.name}
                    />
                    <div className={styles.overlay}>
                      <p>{forthCategory.products_id.length} products</p>
                      <Link to={`/shop?category=${forthCategory._id}`} className={styles.categoryLink}>
                        <h2>{forthCategory.name}</h2>
                      </Link>
                      <Link to={`/shop?category=${forthCategory._id}`} className={styles.categoryLink}>
                        <h6>
                          Go Shopping{" "}
                          <span className="ms-2">
                            <FontAwesomeIcon icon={faArrowRight} />
                          </span>{" "}
                        </h6>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div className={`col-md-7 col-12 ${styles.secondItem}`}>
                {fifthCategory && (
                  <div className={styles.categoryItem}>
                    <img
                      src={
                        process.env.REACT_APP_BASE_URL +
                        "/" +
                        fifthCategory.image
                      }
                      alt={fifthCategory.name}
                    />
                    <div className={styles.overlay}>
                      <p>{fifthCategory.products_id.length} products</p>
                      <Link to={`/shop?category=${fifthCategory._id}`} className={styles.categoryLink}>
                        <h2>{fifthCategory.name}</h2>
                      </Link>
                      <Link to={`/shop?category=${fifthCategory._id}`}  className={styles.categoryLink}>
                        <h6>
                          Go Shopping{" "}
                          <span className="ms-2">
                            <FontAwesomeIcon icon={faArrowRight} />
                          </span>{" "}
                        </h6>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={`row ${styles.gapColumn}`}>
              <div className={`col-md-7 col-12 ${styles.thirdItem}`}>
                {thirdCategory && (
                  <div className={styles.categoryItem}>
                    <img
                      src={
                        process.env.REACT_APP_BASE_URL +
                        "/" +
                        thirdCategory.image
                      }
                      alt={thirdCategory.name}
                    />
                    <div className={styles.overlay}>
                      <p>{thirdCategory.products_id.length} products</p>
                      <Link to={`/shop?category=${thirdCategory._id}`} className={styles.categoryLink}>
                        <h2>{thirdCategory.name}</h2>
                      </Link>
                      <Link to={`/shop?category=${thirdCategory._id}`} className={styles.categoryLink}>
                        <h6>
                          Go Shopping{" "}
                          <span className="ms-2">
                            <FontAwesomeIcon icon={faArrowRight} />
                          </span>{" "}
                        </h6>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div className={`col-md-5 col-12 ${styles.secondItem}`}>
                {firstCategory && (
                  <div className={styles.categoryItem}>
                    <img
                      src={
                        process.env.REACT_APP_BASE_URL +
                        "/" +
                        firstCategory.image
                      }
                      alt={firstCategory.name}
                    />
                    <div className={styles.overlay}>
                      <p>{firstCategory.products_id.length} products</p>
                      <Link to={`/shop?category=${firstCategory._id}`} className={styles.categoryLink}>
                        <h2>{firstCategory.name}</h2>
                      </Link>
                      <Link to={`/shop?category=${firstCategory._id}`} className={styles.categoryLink}>
                        <h6>
                          Go Shopping{" "}
                          <span className="ms-2">
                            <FontAwesomeIcon icon={faArrowRight} />
                          </span>{" "}
                        </h6>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
