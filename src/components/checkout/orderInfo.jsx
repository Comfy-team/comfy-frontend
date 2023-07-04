import { Link } from "react-router-dom";

import "../../App.css";
import style from "../../pages/checkout/checkout.module.css";

const OrderInfo = ({ formData }) => {
  return (
    <div className={`${style.orderInfo} row mr-5 `}>
      <div className={`${style.first} row mr-5 `}>
        <div className={`${style.gray} col-3 mt-3`}> Contact</div>
        <div className="col-6 mt-3"> {formData?.phone}</div>
        <div className="col-3 mt-3">
          <Link to="/checkout/information " className={`${style.linkclass} `}>
            {" "}
            change{" "}
          </Link>
        </div>
      </div>
      <hr className="border" />
      <div className={`${style.last} row `}>
        <div className={`${style.gray} col-3`}> Ship to</div>
        <div className="col-6">
          {" "}
          {formData?.address?.apartment} ,{formData?.address?.street},
          {formData?.address?.city},{formData?.address?.governorate},
          {formData?.address?.country}
        </div>
        <div className="col-3">
          <Link to="/checkout/information" className={`${style.linkclass}`}>
            {" "}
            change{" "}
          </Link>
        </div>{" "}
      </div>
    </div>
  );
};

export default OrderInfo;
