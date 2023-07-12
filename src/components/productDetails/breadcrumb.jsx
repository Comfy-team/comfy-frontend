import { Link } from "react-router-dom";

// style
import style from "../../pages/productDetails/productDetails.module.css";

const Breadcrumb = ({ name }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link
            to="/"
            className={`${style["home-link"]} text-decoration-none color-secondary-gray`}
          >
            Home
          </Link>
        </li>
        <li
          className={`breadcrumb-item active ${style["breadcrumb-item"]} ${style.active}`}
          aria-current="page"
        >
          {name}
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
