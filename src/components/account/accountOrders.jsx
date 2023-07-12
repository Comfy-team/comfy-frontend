import { useState, useEffect } from "react";
import { useParams } from "react-router";

import jwtDecode from "jwt-decode";

//component
import axiosInstance from "../../apis/config";
import Spinner from "../common/spinner";

//style
import styles from "../../pages/account/account.module.css";

const AccountOrders = ({ token }) => {
  const [userOrder, setUserOrder] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setShowSpinner(true);
    if (jwtDecode(token).role === "user") {
      axiosInstance
        .get(`/users/${id}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        })
        .then((res) => {
          setUserOrder(res.data.reverse());
          setShowSpinner(false);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <div>
      <h2 className={`${styles["text-2xl"]} ${styles.subTitle}`}>
        Order History
      </h2>
      {!showSpinner ? (
        <>
          {userOrder.length > 0 ? (
            userOrder.map((order, index) => {
              const collapseId = `collapse-${order._id}`;
              return (
                <div id="accordion" key={order._id} className="container mb-5">
                  <div className="card col-12 col-lg-9">
                    <div className={`card-header ${styles["cardHeader"]}`}>
                      <div
                        className={`d-flex flex-column flex-sm-row p-2 justify-content-sm-between align-items-sm-center ${styles.orderHeader}`}
                      >
                        <div>
                          <p className={`${styles["text-lg"]}`}>
                            #{order._id.substring(0, 11).toUpperCase()}
                          </p>

                          <p className={`text-secondary ${styles.deleverDate}`}>
                            <span>
                              {order.date.slice(0, 16).replace("T", " ")}
                            </span>
                            <span className="mx-2">-</span>
                            <span className={styles.deliever}>
                              To be delivered in 5 days
                            </span>
                          </p>
                        </div>
                        <div className="mt-3 mt-sm-0">
                          <button
                            className={`btn rounded-pill px-3 py-2 bg-white ${styles["btn-show-order"]}`}
                            data-bs-toggle="collapse"
                            data-bs-target={`#${collapseId}`}
                            aria-expanded={index === 0 ? "true" : "false"}
                          >
                            View Order
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      id={collapseId}
                      className={`collapse ${index === 0 ? "show" : ""}`}
                    >
                      {order.items.map((item) => {
                        return (
                          <div
                            className={`card-body text-center ${styles.cartBody}`}
                            key={item._id}
                          >
                            <div className={`d-flex py-4`}>
                              <div
                                className={`position-relative flex-shrink-0 overflow-hidden ${styles.productImage}`}
                              >
                                <img
                                  className="position-absolute w-100 h-100 "
                                  src={
                                    process.env.REACT_APP_BASE_URL +
                                    "/" +
                                    item?.product_id?.images[0].src
                                  }
                                  alt="product item"
                                />
                              </div>
                              <div className="d-flex flex-grow-1 flex-column ms-4">
                                <div className="d-flex justify-content-between">
                                  <div className="text-start">
                                    <h3 className={styles.productName}>
                                      {item?.product_id?.name}
                                    </h3>
                                    <p className={`text-start text-secondary`}>
                                      {item?.product_id?.brand?.name}
                                        <span
                                          className={`${styles.color} rounded-circle ms-2 border-1 d-inline-block`}
                                          style={{
                                            backgroundColor: item.color,
                                          }}
                                        ></span>
                                    </p>
                                  </div>
                                  <div className="mt-1">
                                    <p
                                      className={`${styles.price} py-1 px-2 text-center`}
                                    >
                                      $
                                      {item.price *
                                        (
                                          1 -
                                          item.product_id.discount / 100
                                        ).toFixed(2)}
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <p className="text-start text-secondary">
                                    Qty {item.quantity}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div
                        className={`my-3 mx-3 d-flex justify-content-between align-items-center`}
                      >
                        <div>
                          <p className="h5">Total Price</p>
                        </div>
                        <div>
                          <p
                            className={`h6 ${styles.price} py-1 px-2 text-center`}
                          >
                            ${order.totalPrice}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-secondary">No orders yet.</p>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default AccountOrders;
