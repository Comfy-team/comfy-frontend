import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

// auto animate
import { useAutoAnimate } from "@formkit/auto-animate/react";

// components
import axiosInstance from "../../apis/config";
import ProductCard from "../../components/common/productCard";
import SortDropdown from "../../components/shop/sortDropdown";
import PagePagination from "../../components/shop/pagePagination";
import Aside from "../../components/shop/aside";

// style
import style from "./shop.module.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pagesArr, setPagesArr] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50);
  const [filterBrand, setFilterBrand] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterPrice, setFilterPrice] = useState(0);
  const [sort, setSort] = useState(0);
  const [isSmallScreen, SetIsSmallScreen] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchObj, setSearchObj] = useState({
    page: 1,
    brand: "all",
    category: "all",
    sort: 0,
    price: 0,
  });
  const [searchParams, setSearchParams] = useSearchParams(searchObj);
  const content = useRef();
  const brands = useSelector((state) => state.brands.brands);
  const [animationParent] = useAutoAnimate();

  const getData = (
    page = 1,
    brand = filterBrand,
    category = filterCategory,
    sorting = sort,
    price = 0
  ) => {
    axiosInstance
      .get("/products", {
        params: {
          page,
          brand,
          category,
          sort: sorting,
          price: price,
        },
      })
      .then((res) => {
        setProducts(res.data.data);
        if (page === 1 && sorting === sort) {
          setTotalPages(res.data.totalPages);
          const pages = [];
          for (let i = 1; i <= res.data.totalPages; i++) {
            pages.push(i);
          }
          setPagesArr(pages);
        }
        if (sorting === sort && price === 0) {
          setMinPrice(res.data.minPrice);
          setMaxPrice(res.data.maxPrice);
          setFilterPrice(res.data.maxPrice);
        }
      })
      .catch((error) => console.log(error));
  };

  const handlePageChange = (page) => {
    content.current.scrollIntoView();
    setSearchObj({ ...searchObj, page });
    setSearchParams({ ...searchObj, page });
    setPage(page);
    getData(page);
  };

  const handleSort = (sorting) => {
    setSort(sorting);
    setSearchObj({ ...searchObj, sort: sorting });
    setSearchParams({ ...searchObj, sort: sorting });
    getData(1, filterBrand, filterCategory, sorting);
  };

  const handleCategoryFilter = (value) => {
    setSearchObj({ ...searchObj, category: value });
    setSearchParams({ ...searchObj, category: value });
    setFilterCategory(value);
    getData(1, filterBrand, value);
  };

  const handleBrandFilter = (value) => {
    setSearchObj({ ...searchObj, brand: value });
    setSearchParams({ ...searchObj, brand: value });
    setFilterBrand(value);
    getData(1, value);
  };

  const handlePriceFilter = (value) => {
    setSearchObj({ ...searchObj, price: value });
    setSearchParams({ ...searchObj, price: value });
    setFilterPrice(value);
    getData(1, filterBrand, filterCategory, sort, value);
  };

  useEffect(() => {
    getData();
    axiosInstance
      .get("/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useLayoutEffect(() => {
    function updateSize() {
      SetIsSmallScreen(window.innerWidth <= 767 ? true : false);
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
            onFilterModalToggle={setShowFilterModal}
            categories={categories}
            brands={brands}
            minPrice={minPrice}
            maxPrice={maxPrice}
            filterCategory={filterCategory}
            filterBrand={filterBrand}
            filterPrice={filterPrice}
            handleCategoryFilter={handleCategoryFilter}
            handleBrandFilter={handleBrandFilter}
            handlePriceFilter={handlePriceFilter}
          />
          <div className="col-lg-9 col-md-8 d-flex flex-column justify-content-between">
            {products.length > 0 ? (
              <>
                <div className="products mb-4">
                  <div
                    className={`${
                      !isSmallScreen &&
                      "d-flex justify-content-between align-items-center"
                    } mb-4`}
                  >
                    <p className="mb-0">
                      Showing page {page} of {totalPages} pages
                    </p>
                    {isSmallScreen ? (
                      <div className="d-flex justify-content-between align-items-center pt-3">
                        <button
                          className="btn border"
                          type="button"
                          aria-expanded="false"
                          onClick={() => setShowFilterModal(true)}
                          aria-label="show filter modal"
                        >
                          <FontAwesomeIcon icon={faFilter} /> Filters
                        </button>
                        <SortDropdown active={sort} onSort={handleSort} />
                      </div>
                    ) : (
                      <SortDropdown active={sort} onSort={handleSort} />
                    )}
                  </div>
                  <div
                    ref={animationParent}
                    className={`row ${style["products-grid"]}`}
                  >
                    {products.map((product) => (
                      <div key={product._id} className="col-lg-4 col-sm-6">
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </div>
                <PagePagination
                  pages={pagesArr}
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <p className="text-center h5 mt-5 pt-5">
                Sorry, no matching products
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
