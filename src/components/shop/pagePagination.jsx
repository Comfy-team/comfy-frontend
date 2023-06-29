import { Link } from "react-router-dom";

// style
import style from "../../pages/shop/shop.module.css";

const PagePagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <nav aria-label="Shop pagination">
      <ul className="pagination justify-content-center mb-0">
        <li
          className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
        >
          <Link
            className={`page-link ${style["page-link"]} text-white ${
              currentPage === 1
                ? `disabled ${style.disabled} bg-secondary`
                : "bg-dark "
            }`}
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
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
                className={`page-link ${
                  style["page-link"]
                } bg-transparent border ${
                  page === currentPage
                    ? `active ${style.active}`
                    : "text-secondary"
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
            className={`page-link ${style["page-link"]} text-white ${
              currentPage === totalPages
                ? `disabled ${style.disabled} bg-secondary`
                : "bg-dark "
            }`}
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default PagePagination;
