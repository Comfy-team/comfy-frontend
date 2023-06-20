import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

// auto animate
import { useAutoAnimate } from "@formkit/auto-animate/react";

// for validation
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// component
import axiosInstance from "../../apis/config";
import SearchCard from "../../components/searchPage/searchCard";

// style
import style from "./searchPage.module.css";
import PagePagination from "../../components/shop/pagePagination";

const SearchPage = () => {
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [query, setQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [pagesArr, setPagesArr] = useState([1]);
  const [page, setPage] = useState(1);
  const [animationParent] = useAutoAnimate();
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    query: "",
  });
  const searchContent = useRef();
  const cart = useSelector((state) => state.cart.cart);

  const getData = (page = 1, query = searchValue) => {
    setPage(+page);
    axiosInstance
      .get("/products/search", {
        params: {
          search: query,
          page,
        },
      })
      .then((res) => {
        setData(res.data.data);
        setTotalPages(res.data.totalPages);
        const pages = [];
        for (let i = 1; i <= res.data.totalPages; i++) {
          pages.push(i);
          setPagesArr(pages);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ page: 1, query: searchValue });
    setQuery(searchValue);
  };

  const handlePageChange = (page) => {
    setSearchParams({ page, query: searchValue });
    searchContent.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const searchQuery = searchParams.get("query");
    if (searchQuery) {
      getData(searchParams.get("page"), searchQuery);
      setSearchValue(searchQuery);
      setQuery(searchQuery);
    }
  }, [searchParams]);

  return (
    <div id="search-page" className={`${style["search-page"]} py-5`}>
      <div className="container-fluid py-3">
        <form
          action="#"
          className="row justify-content-center m-0 mb-5"
          onSubmit={handleSearch}
        >
          <div className="col-sm-9 col-lg-6 mb-3 mb-sm-0">
            <input
              type="search"
              className="form-control"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              id="floatingInput"
              placeholder="Search by product, category or brand"
            />
          </div>
          <div className="col-sm-3 col-md-2">
            <button
              type="submit"
              className="btn p-sm-0 py-2 h-100 w-100 btn-dark text-white"
              disabled={searchValue.trim().length === 0 ? true : false}
            >
              Search
            </button>
          </div>
        </form>
        {data ? (
          data.length > 0 ? (
            <div ref={searchContent}>
              <div ref={animationParent} className="row m-0 row-gap-3 mb-5">
                {data.map((product) => {
                  const inCart = cart.items?.findIndex(
                    (ele) => ele.product_id === product._id
                  );
                  return (
                    <div key={product._id} className="sol-sm-6 col-md-4">
                      <SearchCard
                        product={product}
                        cartId={cart._id}
                        inCart={inCart !== -1 ? true : false}
                        query={query}
                      />
                    </div>
                  );
                })}
              </div>
              <PagePagination
                totalPages={totalPages}
                currentPage={page}
                pages={pagesArr}
                onPageChange={handlePageChange}
              />
            </div>
          ) : (
            <h2 className="text-center h5">
              Sorry, can't find matching products
            </h2>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SearchPage;
