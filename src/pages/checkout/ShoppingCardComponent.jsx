import React, { useState, useEffect } from "react";
import style from "./checkout.module.css";
import axiosInstance from "./../../apis/config";
import jwtDecode from "jwt-decode";
// let totalprice = 0;

const allcartptoduct = [
  {
    name: "chair",
    price: "500",
    quantity: "5",
    color: ["red", "black"],
    imgsrc: "https://mdbootstrap.com/img/new/standard/city/041.webp",
  },
  {
    name: "table",
    price: "700",
    quantity: "3",
    color: ["black"],
    imgsrc: "https://mdbootstrap.com/img/new/standard/city/041.webp",
  },
];
export default function ShoppingCardComponent() {
  let [totalprice, SetTotalprice] = useState(0);
  let [Color, SetColor] = useState(["black"]);
  let [quantity, SetQuantity] = useState(0);
  let [items, SetItems] = useState([]);
  // let [totalprice, SetTotalprice] = useState(0);
  const token = localStorage.getItem("userToken");
  const shipping = 15;
  const priceWithShapping = totalprice + shipping;
  if (token) {
    let decodedtoken = jwtDecode(localStorage.getItem("userToken"));
    let { id, email, role } = decodedtoken;
    axiosInstance
      .get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
      .then(res => {
        let cartId = res.data.cart_id;
        // console.log("shooppping", cartId);
        axiosInstance
          .get(`/cart/${cartId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              "x-access-token": token,
            },
          })
          .then(res => {
            console.log(res.data.items);
            let totalprice = res.data.totalPrice;
            SetTotalprice(totalprice);
            console.log(res.data.items.product_id);
            let items = res.data.items;

            // SetItems(items);
            let product_id = res.data.items.product_id;
            let quantity = res.data.items.quantity;
            let color = res.data.items.color;
            let price = res.data.items.price;
            // console.log("res.data.product_id");
            // console.log(res.data.product_id);
            let products = [];
            items
              .forEach(item => {
                let product_id = item.product_id;
                let quantity = item.quantity;
                let color = item.color;
                let price = item.price;
                axiosInstance
                  .get(`/products/${product_id}`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                      "x-access-token": token,
                    },
                  })
                  .then(res => {
                    console.log(res.data);
                    // let productname = res.data.name;
                    // let productimg = res.data.images[0];

                    // let product = {
                    //   id: product_id,
                    //   // name: productname,
                    //   // image: productimg,
                    //   quantity: quantity,
                    //   color: color,
                    //   price: price,
                    // };
                    // products.push(product);
                  })

                  .catch(error => console.log(error.response));
                // store.dispatch(setCart(res.data));
              })

              .catch(error => console.log(error.response));
            // }
          })
          .catch(error => console.log(error));
      });
  }

  return (
    <div>
      {" "}
      <div>
        <div className="container ">
          {allcartptoduct.map((item, index) => (
            <div
              key={index}
              className={`${style.imgcontainer} row mb-2 p-0 m-0`}
            >
              <img
                src={item.imgsrc}
                alt="rr"
                className={`${style.productImg}  col-4`}
              />
              <div className={`${style.productInfo} col-7  `}>
                <h5 className="mb-0">{item.name}</h5>
                <div className={`${style.quantitCircle} mb-1"`}>
                  {item.quantity}
                </div>

                {Color.map((color, index) => (
                  <div
                    key={index}
                    className={`${style.spanColor} `}
                    style={{ backgroundColor: `${color}` }}
                  ></div>
                ))}
              </div>
              <div className="col-2 mt-3 fw-bold ">
                <p className="mb"> ${item.price}</p>
              </div>
            </div>
          ))}
          <div className={`${style.Subtotal} mb-1 row mt-5`}>
            <div className="col-2 ">Subtotal</div>
            <div className="col-7"></div>
            <div className="col-2">
              <p>${totalprice}</p>
            </div>
          </div>
          <div className={`${style.Shipping}  mb-1 row`}>
            <div className="col-4 f-6">Shipping</div>
            <div className="col-5"></div>
            <div className="col-3 ">
              <h5>${shipping}</h5>
            </div>
          </div>
          <hr className="hr" />
          <div className="mb-1 row">
            <div className="col-2 f-bold">Total</div>
            <div className="col-7"></div>
            <div className="col-2">
              <p>
                <span className={`${style.currency}`}> USD</span>$
                {priceWithShapping}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
