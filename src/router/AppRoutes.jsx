import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// components
import LayoutWithNav from "../components/layouts/layoutWithNav";
import LayoutWithPageHeader from "../components/layouts/layoutWithPageHeader";
import HomeDash from "../components/dashboard/home/homeDash";
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
import ProductsAdd from "../components/dashboard/products/productsAdd";
import BrandsAdd from "./../components/dashboard/brands/brandsAdd";
import CategoriesAdd from "./../components/dashboard/categories/categoriesAdd";
import FormComonent from "./../components/checkout/FormComonent";
import PaymentMethod from "./../components/checkout/paymentMethod";

// pages
import Home from "./../pages/home";
import About from "./../pages/about";
import Contact from "./../pages/contact";
import Shop from "./../pages/shop";
import FAQ from "./../pages/faq";
import ProductDetails from "./../pages/productDetails";
import Checkout from "./../pages/checkout";
import CartPage from "./../pages/cartPage";
import Page404 from "./../pages/page404";
import SearchPage from "./../pages/searchPage";
import Account from "./../pages/account";
import Dashboard from "./../pages/dashboard";
import OrderConfirmed from "../pages/orderConfirmed";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutWithNav />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/account/:id" element={<Account />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route element={<LayoutWithPageHeader />}>
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
      </Route>
      <Route path="/order-confirmed/:id" element={<OrderConfirmed />} />
      <Route path="/checkout" element={<Checkout />}>
        <Route path="" element={<FormComonent />} />
        <Route path="shipping" element={<PaymentMethod />} />
      </Route>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="" element={<HomeDash />} />
        <Route path="users" element={<UsersDash />} />
        <Route path="products" element={<ProductsDash />}>
          <Route path="" element={<ProductsData />} />
          <Route path="add" element={<ProductsAdd />} />
          <Route path="update/:id" element={<ProductsUpdate />} />
        </Route>
        <Route path="brands" element={<BrandsDash />}>
          <Route path="" element={<BrandsData />} />
          <Route path="add" element={<BrandsAdd />} />
          <Route path="update/:id" element={<BrandsUpdate />} />
        </Route>
        <Route path="categories" element={<CategoriesDash />}>
          <Route path="" element={<CategoriesData />} />
          <Route path="add" element={<CategoriesAdd />} />
          <Route path="update/:id" element={<CategoriesUpdate />} />
        </Route>
        <Route path="orders" element={<OrdersDash />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default AppRoutes;
