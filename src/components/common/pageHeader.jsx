import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PageHeader({ pageTitle }) {
  const [pageName, setPageName] = useState(pageTitle);

  useEffect(() => {
    setPageName(pageTitle);
  }, [pageTitle]);
  return (
    <div className="headerCover">
      <div className="headerContent">
        <h1 className="text-uppercase"> {pageName} </h1>

        <div className="breadcrumbContainer" style={{ clear: "both" }}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>

              <li className="breadcrumb-item active" aria-current="page">
                {pageName}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
}
