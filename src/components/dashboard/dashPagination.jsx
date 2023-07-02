import { Link } from "react-router-dom";

// style
import style from "../../pages/dashboard/dashboard.module.css";

const DashPagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center px-4">
      <p className={`mb-3 mb-md-0 ${style["dash-secondary-text"]}`}>
        Showing {currentPage} of {totalPages} pages
      </p>
      <nav aria-label="dashboard navigation">
        <ul className="pagination justify-content-center align-items-center gap-1 flex-wrap mb-0">
          <li
            className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
            onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
          >
            <Link
              className={`page-link border-0 ${style["pagination-btn"]} ${
                currentPage === 1 && `disabled ${style.disabled}`
              }`}
            >
              Previous
            </Link>
          </li>
          {totalPages &&
            [...Array(totalPages + 1).keys()].slice(1).map((page) => (
              <li
                key={page}
                className="page-item"
                onClick={() => onPageChange(page)}
              >
                <Link
                  className={`page-link rounded-2 d-flex align-items-center justify-content-center border-0 ${
                    style["pagination-btn"]
                  } ${style["pagination-page"]} ${
                    page === currentPage ? `active ${style.active}` : ""
                  }`}
                >
                  {page}
                </Link>
              </li>
            ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
            onClick={() =>
              currentPage !== totalPages && onPageChange(currentPage + 1)
            }
          >
            <Link
              className={`page-link border-0 ${style["pagination-btn"]} ${
                currentPage === totalPages && `disabled ${style.disabled}`
              }`}
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DashPagination;
