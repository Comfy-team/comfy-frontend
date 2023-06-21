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
import Spinner from "../../components/common/spinner";

// style
import style from "./shop.module.css";

const Shop = () => {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [pagesArr, setPagesArr] = useState(null);
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
  const cart = useSelector((state) => state.cart.cart);
  const [animationParent] = useAutoAnimate();
  const content = useRef();

  const getData = (
    page = 1,
    brand = searchObj.brand,
    category = searchObj.category,
    sort = searchObj.sort,
    price = 0
  ) => {
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
        const pages = [];
        for (let i = 1; i <= res.data.totalPages; i++) {
          pages.push(i);
        }
        setPagesArr(pages);
        if (sort === searchObj.sort && price === 0) {
          setMinPrice(res.data.minPrice);
          setMaxPrice(res.data.maxPrice);

          setSearchObj({
            page,
            brand,
            category,
            sort,
            price: res.data.maxPrice,
          });
          setSearchParams({
            page,
            brand,
            category,
            sort,
            price: res.data.maxPrice,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const updateFilters = (key, value) => {
    const obj = { ...searchObj };
    obj[key] = value;
    setSearchObj(obj);
    setSearchParams(obj);
  };

  const handlePageChange = (page) => {
    content.current.scrollIntoView({ behavior: "smooth" });
    getData(page);
  };

  const handleSort = (sorting) => {
    updateFilters("sort", sorting);
    getData(1, searchObj.brand, searchObj.category, sorting);
  };

  const handleCategoryFilter = (value) => {
    updateFilters("category", value);
    getData(1, searchObj.brand, value);
  };

  const handleBrandFilter = (value) => {
    updateFilters("brand", value);
    getData(1, value);
  };

  const handlePriceFilter = (value) => {
    updateFilters("price", value);
    getData(1, searchObj.brand, searchObj.category, searchObj.sort, value);
  };

  useEffect(() => {
    if (searchParams.get("page")) {
      const page = +searchParams.get("page");
      const brand = searchParams.get("brand") || searchObj.brand;
      const category = searchParams.get("category") || searchObj.category;
      const sort = Number(searchParams.get("sort")) || searchObj.sort;
      const price = +searchParams.get("price") || searchObj.price;
      setSearchObj({ page, brand, category, sort, price });
      getData(page, brand, category, sort, price);
    } else {
      getData();
    }
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
            filters={searchObj}
            handleCategoryFilter={handleCategoryFilter}
            handleBrandFilter={handleBrandFilter}
            handlePriceFilter={handlePriceFilter}
          />
          <div className="col-lg-9 col-md-8 d-flex flex-column justify-content-between">
            {products ? (
              products.length > 0 ? (
                <>
                  <div className="products mb-4">
                    <div
                      className={`${
                        !isSmallScreen &&
                        "d-flex justify-content-between align-items-center"
                      } mb-4`}
                    >
                      <p className="mb-0">
                        Showing page {searchObj.page} of {totalPages} pages
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
                    <div
                      ref={animationParent}
                      className={`row ${style["products-grid"]}`}
                    >
                      {products.map((product) => {
                        const inCart = cart.items
                          ? cart.items.findIndex(
                              (ele) => ele.product_id === product._id
                            ) === -1
                            ? false
                            : true
                          : false;
                        return (
                          <div key={product._id} className="col-lg-4 col-sm-6">
                            <ProductCard
                              product={product}
                              inCart={inCart}
                              cart={cart}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <PagePagination
                    pages={pagesArr}
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
