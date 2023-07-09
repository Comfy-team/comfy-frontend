import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumbcomponant() {
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/cart" className={`text-decoration-none `}>
              Cart
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/checkout" className={`text-decoration-none  `}>
              information
            </Link>
          </li>
          <li className={`breadcrumb-item `} aria-current="page">
            shipping
          </li>
        </ol>
      </nav>
    </>
  );
}
