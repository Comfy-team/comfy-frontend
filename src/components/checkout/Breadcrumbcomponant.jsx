import React from "react";
import { Link } from "react-router-dom";

import style from "../../pages/checkout/checkout.module.css";

export default function Breadcrumbcomponant() {
  return (
    <>
      {" "}
      <nav
        className={`${style.breadcrumb}  --bs-breadcrumb-divider: >`}
        aria-label="breadcrumb"
      >
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/cart" className={` ${style.none} breadlink`}>
              Cart
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link
              to="/checkout"
              className={`breadcrumb-item ${style.none}
                  `}
            >
              information
            </Link>
          </li>
          <li
            className={`breadcrumb-item "
                    }`}
            aria-current="page"
          >
            shipping
          </li>
        </ol>
      </nav>
    </>
  );
}
