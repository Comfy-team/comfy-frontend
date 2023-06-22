// components
import Brands from "../../components/common/brands";
import FollowUs from "../../components/common/followUs";
import MainCarousel from "../../components/home/mainCarousel";
import Trending from './../../components/home/trending';
import BrandCategories from './../../components/home/brandCategories';
import Categories from './../../components/home/categories';
import Services from "../../components/home/services";
import ScrollToTopBtn from "../../components/common/scrollToTopBtn";

const Home = () => {
  return (
    <div id="home">
      <MainCarousel/>
      <Trending/>
      <BrandCategories/>
      <Categories/>
      <Services/>
      <Brands />
      <FollowUs />
    </div>
  );
};

export default Home;
