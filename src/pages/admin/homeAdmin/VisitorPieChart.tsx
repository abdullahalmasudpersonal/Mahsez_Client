import ReactApexChart from "react-apexcharts";

const VisitorPieChart = () => {
  const options = {
    chart: {
      type: "pie" as const,
    },
    labels: ["Direct", "Referral", "Social Media", "Others"], // বিভাগের নাম
    legend: {
      position: "bottom" as "bottom" | "left" | "right" | "top",
    },
    colors: ["#3B82F6", "#34D399", "#F59E0B", "#A78BFA"], // কাস্টম রঙ
    responsive: [
      {
        breakpoint: 768, // মোবাইলের জন্য
        options: {
          legend: {
            position: "bottom" as "bottom" | "left" | "right" | "top", // মোবাইলে লেজেন্ড নিচে যাবে
          },
        },
      },
    ],
  };

  const series = [40, 25, 20, 15]; // বিভাগ অনুযায়ী ভিজিটরের শতাংশ

  return (
    <div
      style={{
        // maxHeight:'400px',
        backgroundColor: "white",
        borderRadius: "4px",
        padding: "20px",
        boxShadow:
          "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
      }}
    >
      <h5
        style={{ 
          textAlign: "center",
          fontWeight: "600",
        }}
      >
        Visitor Sources
      </h5>
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
      />
    </div>
  );
};

export default VisitorPieChart;
