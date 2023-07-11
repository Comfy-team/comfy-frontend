import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import jwt_decode from "jwt-decode";

// components
import axiosInstance from "../../apis/config";
import Spinner from "../../components/common/spinner";

// assets
import hero from "../../assets/order-confirmed.png";

// style
import style from "./orderConfirmed.module.css";

const OrderConfirmed = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/404", { replace: true });
      return;
    }
    let decoded = jwt_decode(token);
    axiosInstance
      .get(`/orders/${id}`, {
        params: {
          id: decoded.id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "x-access-token": token,
        },
      })
      .then((res) => {
        setOrder(res.data);
      })
      .catch((error) => {
        console.log(error);
        navigate("/404", { replace: true });
      });
  }, [id]);

  return order ? (
    <section className="overflow-hidden">
      <div className="bg-light pt-5">
        <img
          src={hero}
          alt=""
          className={`${style.hero} img-fluid mb-3 d-block mx-auto`}
        />
        <p className="text-center fs-5">
          Hi {order.userId.fullName.split(" ")[0]},
        </p>
        <h1 className="text-center px-4">Thank you for your order!</h1>
      </div>
      <div className="mt-5 pb-5">
        <div
          className={`${style.splitted} d-flex justify-content-center align-items-center position-relative`}
        >
          <span className="d-inline-block rounded-2 py-2 px-3 text-white bg-warning">
            Order No: #{order._id.slice(0, 11)}
          </span>
        </div>
        <div className="row m-0 mt-5 py-5 text-center">
          <div className="col-md-4">
            <h2 className="color-secondary-gray fs-5">Date</h2>
            <p>{order.date.split("T")[0]}</p>
          </div>
          <div className="col-md-4 my-4 my-md-0">
            <h2 className="color-secondary-gray fs-5">Billing Address</h2>
            <p>
              {order.address.street}, {order.address.city},{" "}
              {order.address.governorate}
            </p>
          </div>
          <div className="col-md-4">
            <h2 className="color-secondary-gray fs-5">Payment Method</h2>
            <p>Cash</p>
          </div>
        </div>
        <div className="d-flex flex-column flex-sm-row justify-content-evenly align-items-center pb-4">
          <Link
            as="button"
            type="button"
            to={`/account/${order.userId._id}`}
            className="btn btn-dark outline-0 border-0 mb-4 mb-sm-0"
          >
            Go to order information
          </Link>
          <Link
            as="button"
            type="button"
            to={"/shop"}
            className="btn btn-dark outline-0 border-0"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </section>
  ) : (
    <div className="pt-5">
      <Spinner />
    </div>
  );
};

export default OrderConfirmed;
