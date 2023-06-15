import React from "react";
import { Link } from "react-router-dom";

export default function PageHeader({ pages }) {
  return (
    <div className="headerCover bg-danger">
      <div className="headerContent">
        <h1> {pages.label} </h1>

        <div className="breadcrumbContainer" style={{ clear: "both" }}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>

              <li className="breadcrumb-item active" aria-current="page">
                {pages.label}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
}
