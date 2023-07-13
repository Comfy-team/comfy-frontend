import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShop,
  faMagnifyingGlass,
  faCartShopping,
  faUser,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";

// components
import { showLoginModal } from "../../store/slices/loginModalSlice";
import { showCartModal } from "../../store/slices/cartModalSlice";

const BottomNav = ({ cart }) => {
  const dispatch = useDispatch();

  return (
    <nav className="bg-white sticky-bottom border-top">
      <div className="list-unstyled row py-3 m-0">
        <div
          className={`${cart.role === "admin" ? "col-4" : "col-3"} text-center`}
        >
          <div>
            {cart.user_id ? (
              <Link
                className="btn p-0 lh-1 color-main-gray fs-5 hover-color-yellow"
                to={`/account/${cart.user_id}`}
              >
                <FontAwesomeIcon icon={faUser} />
                <span className="visually-hidden">account</span>
              </Link>
            ) : cart.role === "admin" ? (
              <Link
                className="btn p-0 lh-1 color-main-gray fs-5 hover-color-yellow"
                to={`/dashboard`}
              >
                <FontAwesomeIcon icon={faUserGear} />
                <span className="visually-hidden">dashboard</span>
              </Link>
            ) : (
              <button
                className="btn p-0 lh-1 fs-5 color-main-gray hover-color-yellow"
                onClick={() => dispatch(showLoginModal(true))}
              >
                <FontAwesomeIcon icon={faUser} />
                <span className="visually-hidden">login / register</span>
              </button>
            )}
          </div>
        </div>
        <div
          className={`${
            cart.role === "admin" ? "col-4" : "col-3"
          } text-center border-start border-end`}
        >
          <div>
            <Link
              className="btn p-0 lh-1 color-main-gray fs-5 hover-color-yellow"
              to={"/shop"}
            >
              <FontAwesomeIcon icon={faShop} />
              <span className="visually-hidden">shop</span>
            </Link>
          </div>
        </div>
        <div
          className={`${cart.role === "admin" ? "col-4" : "col-3"} text-center`}
        >
          <div>
            <Link
              to="/search"
              className="btn lh-1 p-0 fs-5 color-main-gray hover-color-yellow"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <span className="visually-hidden">search</span>
            </Link>
          </div>
        </div>
        {!(cart.role && cart.role === "admin") && (
          <div className="col-3 text-center border-start">
            <div>
              <button
                type="button"
                className="cart-btn btn lh-1 p-0 fs-5 hover-color-yellow position-relative"
                onClick={() =>
                  cart.user_id
                    ? dispatch(showCartModal(true))
                    : dispatch(showLoginModal(true))
                }
              >
                <FontAwesomeIcon icon={faCartShopping} />
                <span className="visually-hidden">cart</span>
                <span className="position-absolute bg-yellow top-0 start-0 translate-middle badge rounded-pill">
                  {cart.items
                    ? cart.items.length > 99
                      ? "99+"
                      : cart.items.length
                    : 0}
                  <span className="visually-hidden">items in cart</span>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default BottomNav;
