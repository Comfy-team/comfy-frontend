import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// components
import LayoutWithNav from "../components/layouts/layoutWithNav";
import LayoutWithPageHeader from "../components/layouts/layoutWithPageHeader";
import Spinner from "../components/common/spinner";
import PaymentMethod from "./../pages/checkout/paymentMethod";
import FormComonent from "./../pages/checkout/FormComonent";
import HomeDash from "../components/dashboard/homeDash";
import UsersDash from "../components/dashboard/usersDash";
import OrdersDash from "../components/dashboard/orders/ordersDash";
import ProductsDash from "../components/dashboard/products/productsDash";
import BrandsDash from "../components/dashboard/brands/brandsDash";
import CategoriesDash from "../components/dashboard/categories/categoriesDash";
import ProductsData from "../components/dashboard/products/productsData";
import ProductsUpdate from "../components/dashboard/products/productsUpdate";
import BrandsData from "./../components/dashboard/brands/brandsData";
import BrandsUpdate from "./../components/dashboard/brands/brandsUpdate";
import CategoriesData from "../components/dashboard/categories/categoriesData";
import CategoriesUpdate from "../components/dashboard/categories/categoriesUpdate";
import OrdersData from "../components/dashboard/orders/ordersData";
import OrdersUpdate from "../components/dashboard/orders/ordersUpdate";

// pages
const Home = React.lazy(() => import("./../pages/home"));
const About = React.lazy(() => import("./../pages/about"));
const Contact = React.lazy(() => import("./../pages/contact"));
const Shop = React.lazy(() => import("./../pages/shop"));
const FAQ = React.lazy(() => import("./../pages/faq"));
const ProductDetails = React.lazy(() => import("./../pages/productDetails"));
const Checkout = React.lazy(() => import("./../pages/checkout"));
const CartPage = React.lazy(() => import("./../pages/cartPage"));
const Page404 = React.lazy(() => import("./../pages/page404"));
const SearchPage = React.lazy(() => import("./../pages/searchPage"));
const Account = React.lazy(() => import("./../pages/account"));
const Dashboard = React.lazy(() => import("./../pages/dashboard"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutWithNav />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<Spinner />}>
              <Home />
            </Suspense>
          }
        />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route
          path="/account/:id"
          element={
            <Suspense fallback={<Spinner />}>
              <Account />
            </Suspense>
          }
        />
        <Route
          path="/product-details/:id"
          element={
            <Suspense fallback={<Spinner />}>
              <ProductDetails />
            </Suspense>
          }
        />
        <Route element={<LayoutWithPageHeader />}>
          <Route
            path="/shop"
            element={
              <Suspense fallback={<Spinner />}>
                <Shop />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<Spinner />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<Spinner />}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="/faq"
            element={
              <Suspense fallback={<Spinner />}>
                <FAQ />
              </Suspense>
            }
          />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<Spinner />}>
                <CartPage />
              </Suspense>
            }
          />
          <Route
            path="/search"
            element={
              <Suspense fallback={<Spinner />}>
                <SearchPage />
              </Suspense>
            }
          />
        </Route>
      </Route>
      <Route
        path="/checkout"
        element={
          <Suspense fallback={<Spinner />}>
            <Checkout />
          </Suspense>
        }
      >
        <Route path="information" element={<FormComonent />} />
        <Route path="shipping" element={<PaymentMethod />} />
      </Route>
      <Route
        path="/dashboard"
        element={
          <Suspense fallback={<Spinner />}>
            <Dashboard />
          </Suspense>
        }
      >
        <Route path="" element={<HomeDash />} />
        <Route path="users" element={<UsersDash />} />
        <Route path="products" element={<ProductsDash />}>
          <Route path="" element={<ProductsData />} />
          <Route path="update/:id" element={<ProductsUpdate />} />
        </Route>
        <Route path="brands" element={<BrandsDash />}>
          <Route path="" element={<BrandsData />} />
          <Route path="update/:id" element={<BrandsUpdate />} />
        </Route>
        <Route path="categories" element={<CategoriesDash />}>
          <Route path="" element={<CategoriesData />} />
          <Route path="update/:id" element={<CategoriesUpdate />} />
        </Route>
        <Route path="orders" element={<OrdersDash />}>
          <Route path="" element={<OrdersData />} />
          <Route path="update/:id" element={<OrdersUpdate />} />
        </Route>
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default AppRoutes;