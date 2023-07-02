import { useState } from "react";

// charts
import ReactApexChart from "react-apexcharts";

const Revenue = () => {
  const [revenue] = useState({
    series: [
      {
        name: "Cash Flow",
        data: [
          1.45, 5.42, -5.9, -0.42, -12.6, -18.1, 18.2, -14.16, 11.1, -6.09,
          0.34, 3.88, 13.07, 5.8, 2, 7.37, 8.1, 13.57, 15.75,
        ],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [
              {
                from: -50,
                to: -1,
                color: "#696cff",
              },
              {
                from: 0,
                to: 60,
                color: "#03c3ecd9",
              },
            ],
          },
          columnWidth: "80%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#697a8d",
          },
        },
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2022-01",
          "2022-02",
          "2022-03",
          "2022-04",
          "2022-05",
          "2022-06",
          "2022-07",
          "2022-08",
          "2022-09",
          "2022-10",
          "2022-11",
          "2022-12",
          "2023-01",
          "2023-02",
          "2023-03",
          "2023-04",
          "2023-05",
          "2023-06",
          "2023-07",
        ],
        labels: {
          rotate: -90,
          style: {
            colors: "#697a8d",
          },
        },
      },
    },
  });

  return (
    <div className="bg-white rounded-3 p-3 ps-0 flex-fill">
      <h2 className="h5 ps-3">Revenue</h2>
      <ReactApexChart
        options={revenue.options}
        series={revenue.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default Revenue;
