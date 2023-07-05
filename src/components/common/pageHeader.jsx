import { Link } from "react-router-dom";

export default function PageHeader({ path }) {
  return (
    <div className="headerCover d-flex justify-content-center align-items-center">
      <div className="headerContent d-flex flex-column justify-content-center">
        <h1 className="text-capitalize text-center w-100 mb-3">{path}</h1>
        <div className="breadcrumbContainer w-100">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-black-50 text-decoration-none">
                  Home
                </Link>
              </li>
              <li
                className="breadcrumb-item active text-dark text-capitalize"
                aria-current="page"
              >
                {path}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
}
