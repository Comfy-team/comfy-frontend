import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import style from "./checkout.module.css";
import "../../App.css";
import logoimg from "../../assets/logos/logo-header.png";
// import Map from "./../../components/contact/map";
const totalPriceAllOrdersfromdatabase = 1000;
const egyptianGovernorates = [
  { id: 1, name: "Alexandria" },
  { id: 2, name: "Aswan" },
  { id: 3, name: "Asyut" },
  { id: 4, name: "Beheira" },
  { id: 5, name: "Beni Suef" },
  { id: 6, name: "Cairo" },
  { id: 7, name: "Dakahlia" },
  { id: 8, name: "Damietta" },
  { id: 9, name: "Faiyum" },
  { id: 10, name: "Gharbia" },
  { id: 11, name: "Giza" },
  { id: 12, name: "Ismailia" },
  { id: 13, name: "Kafr El Sheikh" },
  { id: 14, name: "Luxor" },
  { id: 15, name: "Matruh" },
  { id: 16, name: "Minya" },
  { id: 17, name: "Monufia" },
  { id: 18, name: "New Valley" },
  { id: 19, name: "North Sinai" },
  { id: 20, name: "Port Said" },
  { id: 21, name: "Qalyubia" },
  { id: 22, name: "Qena" },
  { id: 23, name: "Red Sea" },
  { id: 24, name: "Sharqia" },
  { id: 25, name: "Sohag" },
  { id: 26, name: "South Sinai" },
  { id: 27, name: "Suez" },
];
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
const Checkout = () => {
  const [saveInfo, setSaveInfo] = useState(false);
  const [totalPriceAllOrders, seTtotalPriceAllOrders] = useState(
    totalPriceAllOrdersfromdatabase
  );

  const shipping = 15;
  const priceWithShapping = totalPriceAllOrders + shipping;

  const formik = useFormik({
    initialValues: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {
          firstName: "",
          lastName: "",
          address: "",
          phoneNumber: "",
          government: "",
          Apartment: "",
        },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      address: Yup.string().required("Required"),
      phoneNumber: Yup.string()
        .required("Required")
        .matches(
          /^(01)[0125][0-9]{8}$/,
          "Invalid phone number. Must be an Egyptian phone number"
        ),
      government: Yup.string().required("Required"),
      postalCode: Yup.string()
        .matches(/^[0-9]{5}$/, "Invalid postal code")
        .required("Required"),
      city: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, "Invalid city name")
        .required("Required"),
      country: Yup.string().required("Required"),
    }),

    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      console.log(values);
    },
  });
  useEffect(() => {
    if (saveInfo) {
      localStorage.setItem("userInfo", JSON.stringify(formik.values));
    } else {
      localStorage.removeItem("userInfo");
    }
  }, [saveInfo, formik.values]);

  // const totalPrice = allcartptoduct.reduce((total, item) => {
  //   return total + item.price * item.quantity;
  // }, 0);

  // const totalPriceAllOrders = totalPrice * allcartptoduct.length;

  return (
    <div className={`${style.checkout} ml-5 ml-md-3 `}>
      <div className={`${style.checkoutContainer}  mt-2 `}>
        <img
          src={logoimg}
          alt=""
          style={{ width: "6rem", marginLeft: "15px" }}
          className={`{} mb-3 `}
        />

        <div
          className={`${style[("checkoutSmalContainer", "firstrow")]} row  `}
        >
          <div
            className={`${style.leftFormColum} col-12 col-md-6 col-lg-7  mb-3`}
          >
            <div>
              <nav
                className={`${style.breadcrumb} --bs-breadcrumb-divider: >`}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/" className="breadlink">
                      Home
                    </a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/">information</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Shipping
                  </li>
                </ol>
              </nav>
            </div>
            <form onSubmit={formik.handleSubmit} className={`{} `}>
              <h4> Contact </h4>
              <div className="form-group">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber}
                  placeholder="enter your phone number"
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <small>{formik.errors.phoneNumber}</small>
                ) : null}
              </div>
              <h4 className={`{} mb-0 mt-4 `}> Shipping address </h4>
              <div className="form-group">
                <select
                  id="country"
                  onChange={formik.handleChange}
                  className="form-control"
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                  placeholder="country"
                >
                  <option value="">Select a country</option>
                  <option value="Egypt">Egypt </option>
                </select>
                {formik.touched.country && formik.errors.country ? (
                  <small>{formik.errors.country}</small>
                ) : null}
              </div>
              <div className="row mt-0">
                <div className="form-group col-6">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    placeholder="First Name"
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <small>{formik.errors.firstName}</small>
                  ) : null}
                </div>
                <div className="form-group col-6 m-0">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    placeholder="last Name"
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <small iv>{formik.errors.lastName}</small>
                  ) : null}
                </div>
              </div>

              <div className={`${style.formGroup} form-group`}>
                <input
                  id="address"
                  name="address"
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                  placeholder="address"
                />
                {formik.touched.address && formik.errors.address ? (
                  <small>{formik.errors.address}</small>
                ) : null}
              </div>

              <div className="form-group">
                <input
                  id="Apartment"
                  name="Apartment"
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Apartment}
                  placeholder="Apartment ,suits,etc (optional)"
                />
              </div>

              <div className="row mb-3 mt-0">
                <div className="form-group col-4 ">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.city}
                    placeholder="city"
                  />
                  {formik.touched.city && formik.errors.city ? (
                    <small>{formik.errors.city}</small>
                  ) : null}
                </div>
                <div className="form-group col-4 ">
                  <select
                    id="government"
                    name="government"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.government}
                  >
                    <option value="">Select a government</option>
                    {egyptianGovernorates.map(gov => (
                      <option value={gov.name} key={gov.id}>
                        {gov.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.government && formik.errors.government ? (
                    <small>{formik.errors.government}</small>
                  ) : null}
                </div>
                <div className="form-group col-4 ">
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.postalCode}
                    placeholder="postalCode"
                  />
                  {formik.touched.postalCode && formik.errors.postalCode ? (
                    <small>{formik.errors.postalCode}</small>
                  ) : null}
                </div>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  checked={saveInfo}
                  onChange={e => setSaveInfo(e.target.checked)}
                />

                <label
                  className={`${style.checklabal} form-check-label`}
                  htmlFor="exampleCheck1"
                >
                  save this information for next time{" "}
                </label>
              </div>
              <button type="submit" className="btn btn-primary  ">
                Submit
              </button>
            </form>
          </div>
          <div
            className={`${style.rightorderColumn} col-12 col-md-6 col-lg-5   `}
          >
            <div>
              <h1 className="text-center mt-2 ">Shopping Cart</h1>

              <div className="container ">
                {allcartptoduct.map(item => (
                  <div className={`${style.imgcontainer} row mb-2 p-0 m-0`}>
                    <img
                      src={item.imgsrc}
                      alt="rr"
                      class=""
                      className={`${style.productImg}  
                    
                    col-4`}
                    />

                    <div className={`${style.productInfo} col-7  `}>
                      <h5 className="mb-0">{item.name}</h5>
                      <div className={`${style.quantitCircle} mb-1"`}>
                        {item.quantity}
                      </div>

                      {item.color.map(color => (
                        <div
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
                    <p>${totalPriceAllOrders}</p>
                  </div>
                </div>
                <div className={`${style.Shipping}  mb-1 row`}>
                  <div className="col-4 f-6">Shipping</div>
                  <div className="col-5"></div>
                  <div className="col-3 ">
                    <hp5>${shipping}</hp5>
                  </div>
                </div>

                <hr class="hr" />
                <div className="mb-1 row">
                  <div className="col-2 f-bold">Total</div>
                  <div className="col-7"></div>
                  <div className="col-2">
                    <p>
                      {" "}
                      <span className={`${style.currency}`}> USD</span>$
                      {priceWithShapping}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
