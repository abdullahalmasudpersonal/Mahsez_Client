import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const EarningsChart = () => {
  const options = {
    chart: {
      type: "bar",
      stacked: false,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        endingShape: "rounded",
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#3B82F6", "#A5B4FC"],
    legend: {
      show: false,
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    tooltip: {
      y: {
        formatter: (val) => `$${val.toLocaleString()}`,
      },
    },
  };

  const series = [
    {
      //   name: "Revenue",
      data: [37000, 20000, 30000, 25000, 50000, 40000, 15000, 25000],
    },
    {
      //   name: "Profit",
      data: [28000, 15000, 22000, 18000, 40000, 30000, 10000, 20000],
    },
  ];

  //////////////////////////////////
  const [selectedFilters, setSelectedFilters] = useState({
    revenue: "1",
    orders: "1",
    growth: "1",
    conversion: "1",
  });
  const filters = [
    { key: "1", label: "Today" },
    { key: "7", label: "Last Week" },
    { key: "30", label: "Last Month" },
    { key: "365", label: "Current Year" },
  ];

  const handleMenuClick = (key: string, filter: string) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: filter }));
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "white",
        borderRadius: "4px",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        width: "50%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h4 style={{ margin: "0px" }}>Earnings</h4>
        <Dropdown
          placement="bottomRight"
          menu={{
            items: filters.map((filter) => ({
              key: filter.key,
              label: (
                <span onClick={() => handleMenuClick("cardKey", filter.key)}>
                  {filter.label}
                </span>
              ),
            })),
          }}
          trigger={["click"]}
        >
          <EllipsisOutlined
            style={{
              fontSize: "30px",
              cursor: "pointer",
              color: "black",
            }}
          />
        </Dropdown>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <p style={{ color: "#3B82F6", fontWeight: "600", margin: "0" }}>
            <small>Revenue</small>
          </p>
          <span style={{ margin: "0", fontSize: "1.2rem", fontWeight: "700" }}>
            $37,802
          </span>
          <span style={{ fontSize: "0.8rem", color: "green" }}>▲ 0.56%</span>
        </div>

        <div>
          <p style={{ color: "#A5B4FC", fontWeight: "600", margin: "0" }}>
            <small>Profit</small>
          </p>
          <span style={{ margin: "0", fontSize: "1.2rem", fontWeight: "700" }}>
            $28,305
          </span>
          <span style={{ fontSize: "0.8rem", color: "green" }}>▲ 0.56%</span>
        </div>
      </div>

      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        max-height={300}
      />
    </div>
  );
};

export default EarningsChart;
