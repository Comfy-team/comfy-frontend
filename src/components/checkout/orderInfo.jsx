import { Link } from "react-router-dom";

import style from "../../pages/checkout/checkout.module.css";

const OrderInfo = ({ formData }) => {
  return (
    <div className={`${style.orderInfo} row mr-5 `}>
      <div className={`${style.first} row mr-5 `}>
        <div className={`${style.gray} col-3 mt-3`}> Contact</div>
        <div className="col-6 mt-3"> {formData?.phone}</div>
        <div className="col-3 mt-3">
          <Link to="/checkout " className={`${style.linkclass} `}>
            {" "}
            change{" "}
          </Link>
        </div>
      </div>
      <hr className="border mb-2 mt-3" />
      <div className={`${style.last} row mb-2`}>
        <div className={`${style.gray} col-3`}> Ship to</div>
        <div className="col-6">
          {" "}
          {formData?.address?.apartment} ,{formData?.address?.street},
          {formData?.address?.city},{formData?.address?.governorate}
        </div>
        <div className="col-3">
          <Link to="/checkout" className={`${style.linkclass}`}>
            {" "}
            change{" "}
          </Link>
        </div>{" "}
      </div>
    </div>
  );
};

export default OrderInfo;
