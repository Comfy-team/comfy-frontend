// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";

// style
import  styles  from "./../../pages/home/home.module.css"

const Services = () => {
  return (
    <div className="container">
      <div className={`row ${styles.services}` }>
        <div className={`col-sm-12 col-md-4 mb-md-0 mb-4 col-lg-4 text-center ${styles.item}`}>
            <div className={styles.icon}>
            <FontAwesomeIcon icon={faCube}/>
            </div>
            <h3>Free Worldwide Shipping</h3>
            <p>On all orders over $75.00</p>
        </div>
        <div className={`col-sm-12 col-md-4 mb-md-0 mb-4 col-lg-4 text-center ${styles.item}`}>
            <div className={styles.icon}>
            <FontAwesomeIcon icon={faCreditCard}/>
            </div>
            <h3>100% Payment Secure</h3>
            <p>We ensure secure payment with PEV</p>
        </div>
        <div className={`col-sm-12 col-md-4 col-lg-4 text-center ${styles.item}`}>
            <div className={styles.icon}>
            <FontAwesomeIcon icon={faRefresh}/>
            </div>
            <h3>30 Days Return</h3>
            <p>Return it within 20 day for an exchange</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
