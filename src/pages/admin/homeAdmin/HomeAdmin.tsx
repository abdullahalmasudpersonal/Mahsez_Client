import "./HomeAdmin.css";
import AdminCart from "./AdminCart";
import EarningsChart from "./EarningsChart";
import VisitorPieChart from "./VisitorPieChart";
import TopProducts from "./TopProducts";
import OfferProducts from "./OfferProducts";
import RecentOrder from "./RecentOrder";

const HomeAdmin = () => {
  return (
    <div
      className="dashboard-dev2"
      style={{ padding: "15px", backgroundColor: "rgb(247, 247, 247)" }}
    >
      <AdminCart />
      <div
        style={{
          display: "flex",
          marginTop: "20px",
          marginBottom: "20px",
          gap: "20px",
        }}
      >
        <EarningsChart />
        <VisitorPieChart />
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "20px",
          marginBottom: "20px",
          gap: "20px",
        }}
      >
        <TopProducts />
        <OfferProducts />
      </div>
      <RecentOrder />
    </div>
  );
};

export default HomeAdmin;
