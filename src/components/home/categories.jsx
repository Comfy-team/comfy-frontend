import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// component
import axiosInstance from "./../../apis/config";

// style
import styles from "./../../pages/home/home.module.css";

const Categories = () => {
  
  const [categories, setCategories] = useState([]);
  // Find the categories in the array by their name
  const chairsCategory = categories.find((category) => category.name === "chairs");
  const lightingCategory = categories.find((category) => category.name === "lighting");
  const decorCategory = categories.find((category) => category.name === "decor");
  const sofasCategory = categories.find((category) => category.name === "sofas");
  const tablesCategory = categories.find((category) => category.name === "tables");

  useEffect(() => {
    axiosInstance
      .get("/categories")
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="container-fluid px-md-5 ">
        <div className={`row ${styles.gapColumn} ${styles.category}`}>
          <div className={`col-md-4 col-12 ${styles.itemOne}`}>
            {chairsCategory && (
              <div className={`${styles.categoryItem} h-100 `}>
                <img
                    className={`${styles.categiryImage}`}
                  src={ 
                    process.env.REACT_APP_BASE_URL + "/" + chairsCategory.image
                  }
                  alt={chairsCategory.name}
                />
                <div className={styles.overlay}>
                  <p>{chairsCategory.products_id.length} products</p>
                  <Link to={`shop?page=1&brand=all&category=${chairsCategory._id}&sort=0&price=0`} className={styles.categoryLink}>
                    <h2>{chairsCategory.name}</h2>
                  </Link>
                  <Link to={`shop?page=1&brand=all&category=${chairsCategory._id}&sort=0&price=0`} className={styles.categoryLink}>
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
                {lightingCategory && (
                  <div className={styles.categoryItem}>
                    <img
                      src={
                        process.env.REACT_APP_BASE_URL +
                        "/" +
                        lightingCategory.image
                      }
                      alt={lightingCategory.name}
                    />
                    <div className={styles.overlay}>
                      <p>{lightingCategory.products_id.length} products</p>
                      <Link to={`shop?page=1&brand=all&category=${lightingCategory._id}&sort=0&price=0`} className={styles.categoryLink}>
                        <h2>{lightingCategory.name}</h2>
                      </Link>
                      <Link to={`shop?page=1&brand=all&category=${lightingCategory._id}&sort=0&price=0`} className={styles.categoryLink}>
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
                {decorCategory && (
                  <div className={styles.categoryItem}>
                    <img
                      src={
                        process.env.REACT_APP_BASE_URL +
                        "/" +
                        decorCategory.image
                      }
                      alt={decorCategory.name}
                    />
                    <div className={styles.overlay}>
                      <p>{decorCategory.products_id.length} products</p>
                      <Link to={`shop?page=1&brand=all&category=${decorCategory._id}&sort=0&price=0`} className={styles.categoryLink}>
                        <h2>{decorCategory.name}</h2>
                      </Link>
                      <Link to={`shop?page=1&brand=all&category=${decorCategory._id}&sort=0&price=0`}  className={styles.categoryLink}>
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
                {sofasCategory && (
                  <div className={styles.categoryItem}>
                    <img
                      src={
                        process.env.REACT_APP_BASE_URL +
                        "/" +
                        sofasCategory.image
                      }
                      alt={sofasCategory.name}
                    />
                    <div className={styles.overlay}>
                      <p>{sofasCategory.products_id.length} products</p>
                      <Link to={`shop?page=1&brand=all&category=${sofasCategory._id}&sort=0&price=0`} className={styles.categoryLink}>
                        <h2>{sofasCategory.name}</h2>
                      </Link>
                      <Link to={`shop?page=1&brand=all&category=${sofasCategory._id}&sort=0&price=0`} className={styles.categoryLink}>
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
                {tablesCategory && (
                  <div className={styles.categoryItem}>
                    <img
                      src={
                        process.env.REACT_APP_BASE_URL +
                        "/" +
                        tablesCategory.image
                      }
                      alt={tablesCategory.name}
                    />
                    <div className={styles.overlay}>
                      <p>{tablesCategory.products_id.length} products</p>
                      <Link to={`shop?page=1&brand=all&category=${tablesCategory._id}&sort=0&price=0`} className={styles.categoryLink}>
                        <h2>{tablesCategory.name}</h2>
                      </Link>
                      <Link to={`shop?page=1&brand=all&category=${tablesCategory._id}&sort=0&price=0`} className={styles.categoryLink}>
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