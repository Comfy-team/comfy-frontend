import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

// components
import axiosInstance from "../../apis/config";
import ProductCard from "../../components/common/productCard";
import SortDropdown from "../../components/shop/sortDropdown";
import PagePagination from "../../components/shop/pagePagination";
import Aside from "../../components/shop/aside";
import Spinner from "../../components/common/spinner";

// functions
import { disableBodyScroll, enableBodyScroll } from "../../functions/global";

// style
import style from "./shop.module.css";

const Shop = () => {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50);
  const [isSmallScreen, SetIsSmallScreen] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchObj, setSearchObj] = useState({
    page: 1,
    brand: "all",
    category: "all",
    sort: 0,
    price: 0,
  });
  const [searchParams, setSearchParams] = useSearchParams({});
  const brands = useSelector((state) => state.brands.brands);
  const content = useRef();

  const getData = (
    getMaxMinPrices = false,
    page = 1,
    brand = searchObj.brand,
    category = searchObj.category,
    sort = searchObj.sort,
    price = searchObj.price
  ) => {
    setProducts(null);
    axiosInstance
      .get("/products", {
        params: {
          page,
          brand,
          category,
          sort,
          price,
        },
      })
      .then((res) => {
        setProducts(res.data.data);
        setTotalPages(res.data.totalPages);
        if (getMaxMinPrices) {
          setMinPrice(res.data.minPrice);
          setMaxPrice(res.data.maxPrice);
          setSearchObj({
            page,
            brand,
            category,
            sort,
            price,
          });
          setSearchParams({
            page,
            brand,
            category,
            sort,
            price,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const updateFilters = (key, value) => {
    const obj = { ...searchObj };
    obj[key] = value;
    if (key !== "page") obj["page"] = 1;
    setSearchObj(obj);
    setSearchParams(obj);
  };

  const handlePageChange = (page) => {
    content.current.scrollIntoView({ behavior: "smooth" });
    updateFilters("page", page);
    getData(false, page);
  };

  const handleSort = (sorting) => {
    updateFilters("sort", sorting);
    getData(false, 1, searchObj.brand, searchObj.category, sorting);
  };

  const handleCategoryFilter = (value) => {
    updateFilters("category", value);
    getData(true, 1, searchObj.brand, value);
  };

  const handleBrandFilter = (value) => {
    updateFilters("brand", value);
    getData(true, 1, value);
  };

  const handlePriceFilter = (value) => {
    updateFilters("price", value);
    getData(
      false,
      1,
      searchObj.brand,
      searchObj.category,
      searchObj.sort,
      value
    );
  };

  const handleCloseFilterModal = () => {
    setShowFilterModal(false);
    enableBodyScroll();
  };

  const handleOpenFilterModal = () => {
    disableBodyScroll();
    setShowFilterModal(true);
  };

  useEffect(() => {
    if (searchParams.get("page")) {
      const page = +searchParams.get("page");
      const brand = searchParams.get("brand") || searchObj.brand;
      const category = searchParams.get("category") || searchObj.category;
      const sort = Number(searchParams.get("sort")) || searchObj.sort;
      const price = +searchParams.get("price") || searchObj.price;
      setSearchObj({ page, brand, category, sort, price });
      getData(true, page, brand, category, sort, price);
    } else {
      getData(true);
    }
    axiosInstance
      .get("/categories")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useLayoutEffect(() => {
    function updateSize() {
      SetIsSmallScreen(window.innerWidth < 768 ? true : false);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [window.innerWidth]);

  return (
    <section id="shop" className="py-5">
      <div ref={content} className="container-fluid">
        <div
          className={`${style["content-holder"]} row mx-0 mt-0 flex-md-row-reverse`}
        >
          <Aside
            showFilterModal={showFilterModal}
            isSmallScreen={isSmallScreen}
            closeFilterModal={handleCloseFilterModal}
            categories={categories}
            brands={brands}
            minPrice={minPrice}
            maxPrice={maxPrice}
            filters={searchObj}
            handleCategoryFilter={handleCategoryFilter}
            handleBrandFilter={handleBrandFilter}
            handlePriceFilter={handlePriceFilter}
          />
          <div className="col-lg-9 col-md-8 d-flex flex-column justify-content-between">
            {products ? (
              products.length > 0 ? (
                <>
                  <div className="products mb-5">
                    <div
                      className={`${
                        !isSmallScreen
                          ? "d-flex justify-content-between align-items-center"
                          : ""
                      } mb-4`}
                    >
                      <p className="mb-0">
                        Showing page {searchObj.page} of {totalPages} pages
                      </p>
                      {isSmallScreen ? (
                        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center pt-3">
                          <button
                            className="btn border d-inline-block mb-sm-0 mb-4"
                            type="button"
                            aria-expanded="false"
                            onClick={handleOpenFilterModal}
                            aria-label="show filter modal"
                          >
                            <FontAwesomeIcon icon={faFilter} /> Filters
                          </button>
                          <SortDropdown
                            active={searchObj.sort}
                            onSort={handleSort}
                          />
                        </div>
                      ) : (
                        <SortDropdown
                          active={searchObj.sort}
                          onSort={handleSort}
                        />
                      )}
                    </div>
                    <div className="row row-gap-3">
                      {products.map((product) => (
                        <div key={product._id} className="col-lg-4 col-sm-6">
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <PagePagination
                    currentPage={searchObj.page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <p className="text-center h5 mt-5 pt-5">
                  Sorry, no matching products
                </p>
              )
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
