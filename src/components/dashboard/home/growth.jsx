import { useState } from "react";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faWallet } from "@fortawesome/free-solid-svg-icons";

// charts
import ReactApexChart from "react-apexcharts";

// style
import style from "../../../pages/dashboard/dashboard.module.css";

const Growth = () => {
  const [growth] = useState({
    series: [100],
    options: {
      chart: {
        height: 400,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 75,
          dataLabels: {
            name: {
              fontSize: "1rem",
              color: "#697a8d",
            },
            value: {
              fontSize: "1rem",
              color: "#697a8d",
              formatter: function (val) {
                return 78 + "%";
              },
            },
          },
        },
      },
      fill: {
        colors: ["#696cff"],
        type: "gradient",
        gradient: {
          shade: "#696cff",
          shadeIntensity: 0.1,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 0.6,
          stops: [0, 100],
        },
      },
      stroke: {
        dashArray: 4,
      },
      labels: ["Growth"],
    },
  });

  return (
    <div className="bg-white rounded-3 p-3 d-flex flex-column flex-fill">
      <h2 className="h5 mb-1">Profit</h2>
      <p className={`${style["dash-sales-stats-sub-heading"]} mb-0`}>
        420.2k Total Profit
      </p>
      <div className="d-flex flex-column flex-fill">
        <div className="d-flex align-items-center justify-content-center flex-fill">
          <ReactApexChart
            options={growth.options}
            series={growth.series}
            type="radialBar"
          />
        </div>
        <div className="row m-0 mt-4">
          <div className="col-6 ps-0 d-flex justify-content-end align-items-center gap-2">
            <span
              className={`${style["dash-total-revenue-wallet"]} d-flex align-items-center p-2 lh-1 rounded-1`}
            >
              <FontAwesomeIcon icon={faWallet} />
            </span>
            <div className={style["dash-total-revenue-stats"]}>
              <span className="d-block">2022</span>
              <span className="d-block fw-semibold">$32.5k</span>
            </div>
          </div>
          <div className="col-6 pe-0 d-flex justify-content-start align-items-center gap-2">
            <span
              className={`${style["dash-total-revenue-dollar"]} ${style["dash-purple"]} d-flex align-items-center p-2 lh-1 rounded-1`}
            >
              <FontAwesomeIcon icon={faDollarSign} />
            </span>
            <div className={style["dash-total-revenue-stats"]}>
              <span className="d-block">2023</span>
              <span className="d-block fw-semibold">$12k</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Growth;
