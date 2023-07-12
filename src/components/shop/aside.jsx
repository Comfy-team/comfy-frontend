// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// components
import Filter from "./filter";
import PriceFilter from "./priceFilter";

// style
import style from "../../pages/shop/shop.module.css";

const Aside = ({
  showFilterModal,
  isSmallScreen,
  closeFilterModal,
  categories,
  brands,
  minPrice,
  maxPrice,
  filters,
  handleCategoryFilter,
  handleBrandFilter,
  handlePriceFilter,
}) => {
  return (
    <div
      className={`${style["shop-sidebar"]} ${
        showFilterModal ? style.show : ""
      } col-lg-3 col-md-4 pb-md-5`}
    >
      <aside className={`bg-white ${style.aside} pb-md-0 pb-4`}>
        {isSmallScreen && (
          <div className="bg-dark p-3 text-white d-flex justify-content-between align-items-center">
            <h2 className="h6 text-uppercase mb-0">Filters</h2>
            <button
              type="button"
              className="btn outline-0 text-white border-0 p-0"
              onClick={closeFilterModal}
              aria-label="close filter modal"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        )}
        <form className={`${style.form} pt-4 pb-5 px-3 p-md-0`}>
          <Filter
            data={categories}
            name="categories"
            active={filters.category}
            onFilter={handleCategoryFilter}
          />
          <Filter
            data={brands}
            name="brands"
            active={filters.brand}
            onFilter={handleBrandFilter}
          />
          <PriceFilter
            min={minPrice}
            max={maxPrice}
            value={filters.price || maxPrice}
            onFilter={handlePriceFilter}
          />
        </form>
      </aside>
    </div>
  );
};

export default Aside;
