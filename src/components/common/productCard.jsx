import { NavLink } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card card position-relative border-0 rounded-0">
      {product?.discount > 0 && (
        <span class="badge d-block bg-yellow position-absolute text-white">
          -{product.discount}%
        </span>
      )}
      <NavLink
        to="/product-details/6488e975b97ebaee38bf9492"
        className="holder position-relative overflow-hidden"
      >
        <img
          src={process.env.REACT_APP_BASE_URL + "/" + product?.images[0].src}
          alt={product?.name}
          className="img-fluid card-img-top rounded-0"
        />
        <img
          src={process.env.REACT_APP_BASE_URL + "/" + product?.images[1].src}
          alt={product?.name}
          className="img-fluid card-img-top rounded-0 hover-img position-absolute w-100 h-100 top-0 start-0"
        />
      </NavLink>
      <div className="card-body text-center">
        <h3 className="h6 fw-bold card-title">
          <NavLink
            className="d-block text-ellipsis text-decoration-none hover-color-yellow color-product-name"
            to="/product-details/6488e975b97ebaee38bf9492"
          >
            {product?.name}
          </NavLink>
        </h3>
        <div className="card-text">
          {product?.discount > 0 ? (
            <div className="d-flex align-items-center justify-content-center gap-3">
              <span className="fw-semibold">
                $
                {(
                  product.price -
                  (product.price * product.discount) / 100
                ).toFixed(2)}
              </span>
              <span className="color-old-price text-decoration-line-through">
                ${product?.price}
              </span>
            </div>
          ) : (
            <span className="fw-semibold">${product?.price}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
