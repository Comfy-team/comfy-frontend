import { useState } from "react";

// charts
import ReactApexChart from "react-apexcharts";

// style
import style from "../../../pages/dashboard/dashboard.module.css";

const SalesStats = () => {
  const [stats] = useState({
    series: [32, 23, 20, 28, 30],
    options: {
      chart: {
        width: 360,
        type: "polarArea",
      },
      labels: ["Chairs", "Tables", "Decor", "Sofas", "Lighting"],
      fill: {
        opacity: 1,
        colors: ['#662e9b', '#f86624', '#f9c80e', '#ea3546', '#43bccd']
      },
      stroke: {
        width: 0,
        colors: undefined,
      },
      yaxis: {
        show: false,
      },
      legend: {
        position: "bottom",
        labels: {
          colors: "#697a8d",
      },
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 0,
          },
          spokes: {
            strokeWidth: 0,
          },
        },
      },
      theme: {
        palette: "palette8"
      },
    },
  });
  return (
    <div className="bg-white rounded-3 p-3 mb-3">
      <h2 className="h5 mb-1">Sales</h2>
      <p className={style["dash-sales-stats-sub-heading"]}>
        42.82k Total Sales
      </p>
      <ReactApexChart options={stats.options} series={stats.series} type="polarArea"/>
    </div>
  );
};

export default SalesStats;
