import { useState, useEffect } from "react";
import { useParams } from "react-router";

import styles from "../../pages/account/account.module.css";
import axiosInstance from "../../apis/config";
import jwtDecode from "jwt-decode";

const AccountOrders = ({ token }) => {
  const [isCollapsed, setIsCollapsed] = useState({});
  const [userOrder, setUserOrder] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    if (jwtDecode(token).role === "user"){
    axiosInstance
      .get(`/users/${id}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
      .then((res) => {
        setUserOrder(res.data);
        setIsCollapsed((prevState) => {
          // Set the first order ID to false (expanded) and the rest to true (collapsed)
          const newState = {};
          res.data.forEach((order, index) => {
            newState[order._id] = index === 0 ? false : true;
          });
          return { ...prevState, ...newState };
        });
      })
      .catch((error) => console.log(error));
    }
  }, []);

  const handleToggleCollapse = (orderId) => {
    setIsCollapsed((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }));
  };
  return (
    <div>
      <h2 className={`${styles["text-2xl"]} ${styles.subTitle}`}>
        Order History
      </h2>

      {userOrder.length > 0 ? (
        userOrder.map((order) => {
          const collapseId = `collapse-${order._id}`;
          return (
            <div id="accordion" key={order._id} className="container mb-5">
              <div className="card row col-12 col-lg-9">
                <div className={`card-header ${styles["cardHeader"]}`}>
                  <div
                    className={`d-flex flex-column flex-sm-row p-2 justify-content-sm-between align-items-sm-center ${styles.orderHeader}`}
                  >
                    <div>
                      <p className={`${styles["text-lg"]}`}>
                        #{order._id.substring(0, 11).toUpperCase()}
                      </p>

                      <p className={`text-secondary ${styles.deleverDate}`}>
                        <span>{order.date}</span>
                        <span className="mx-2">-</span>
                        <span className={styles.deliever}>Delivered</span>
                      </p>
                    </div>
                    <div className="mt-3 mt-sm-0">
                      <button
                        className={`btn rounded-pill px-3 py-2 bg-white ${styles["btn-show-order"]}`}
                        data-toggle="collapse"
                        data-target={`${collapseId}`}
                        aria-expanded={
                          isCollapsed[order._id] ? "false" : "true"
                        }
                        onClick={() => handleToggleCollapse(order._id)}
                      >
                        View Order
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  id={collapseId}
                  data-parent="#accordion"
                  className={`collapse ${isCollapsed[order._id] ? "" : "show"}`}
                >
                  {order.items.map((item) => {
                    return (
                      <div
                        className={`card-body text-center ${styles.cartBody}`}
                        key={order._id}
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
                              alt="image"
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
                                </p>
                              </div>
                              <div className="ml-2 mt-1">
                                <p
                                  className={`${styles.price} py-1 px-2 text-center`}
                                >
                                  ${item.price}
                                </p>
                              </div>
                            </div>

                            <div className="">
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
                      <p className={`h5 ${styles.price} py-1 px-2 text-center`}>
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
    </div>
  );
};

export default AccountOrders;
