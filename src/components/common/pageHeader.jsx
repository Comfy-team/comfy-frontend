import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function PageHeader({ props }) {
  const [pagename, setPagename] = useState("props");

  return (
    <div className="headerCover">
      <div className="headerContent">
        <h1> {pagename} </h1>

        <div className="breadcrumbContainer" style={{ clear: "both" }}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>

              <li className="breadcrumb-item active" aria-current="page">
                {pagename}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
}
