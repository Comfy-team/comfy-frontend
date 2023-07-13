import { useState } from "react";

// charts
import ReactApexChart from "react-apexcharts";

const CustomersStats = () => {
  const series = {
    monthDataSeries1: {
      prices: [59, 79, 37, 16, 11, 122],
      dates: [
        "2022-1-1",
        "2022-3-2",
        "2022-4-5",
        "2022-5-5",
        "2022-6-13",
        "2022-8-22",
      ],
    },
  };
  const [customers] = useState({
    series: [
      {
        name: "",
        data: series.monthDataSeries1.prices,
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false,
        },
        toolbar: { show: false },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      labels: series.monthDataSeries1.dates,
      xaxis: {
        type: "datetime",
        labels: {
          style: {
            colors: "#697a8d",
          },
        },
      },
      yaxis: {
        opposite: true,
        labels: {
          style: {
            colors: "#697a8d",
          },
        },
      },
      legend: {
        horizontalAlign: "left",
      },
    },
  });

  return (
    <div className="bg-white rounded-3 p-3 ps-0 h-100">
      <h2 className="h5 mb-1 ps-3">Customers</h2>
      <ReactApexChart
        options={customers.options}
        series={customers.series}
        type="area"
      />
    </div>
  );
};

export default CustomersStats;
