// components
import WelcomeCard from "./welcomeCard";
import SalesStats from "./salesStats";
import Revenue from "./revenue";
import Growth from "./growth";
import PageStats from "./pageStats";
import CustomersStats from "./customersStats";

// style
import style from "../../../pages/dashboard/dashboard.module.css";

const HomeDash = () => {
  return (
    <div id={style["dash-home"]} className={`${style["dash-bg-gray"]}`}>
      <div className="row m-0 mb-3">
        <div className="col-md-8 px-0 pe-md-2 mb-3 mb-md-0 d-flex flex-column">
          <WelcomeCard />
          <Revenue />
        </div>
        <div className="col-md-4 px-0 ps-md-2 d-flex flex-column">
          <SalesStats />
          <Growth />
        </div>
      </div>
      <div className="row m-0">
        <div className="col-md-6 px-0 pe-md-2 mb-3 mb-md-0">
          <PageStats />
        </div>
        <div className="col-md-6 px-0 ps-md-2">
          <CustomersStats />
        </div>
      </div>
    </div>
  );
};

export default HomeDash;
