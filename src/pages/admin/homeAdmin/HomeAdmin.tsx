import "./HomeAdmin.css";
import AdminCart from "./AdminCart";
import RecentProduct from "./recent/RecentProduct";
import RecentOrder from "./recent/RecentOrder";
import { Col, Row } from "antd";
import OfferProducts from "./OfferProducts";
import TopProducts from "./TopProducts";
import EarningsChart from "./chart/EarningsChart";
import RecentOrdersChart from "./chart/RecentOrdertChart";

const HomeAdmin = () => {
  return (
    <div>
      <AdminCart />
      
      {/* <div
        style={{
          display: "flex",
          marginTop: "20px",
          marginBottom: "20px",
          gap: "20px",
        }}
      >
        <EarningsChart />
        <VisitorPieChart />
      </div> */}

      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <EarningsChart />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          {/* <VisitorPieChart /> */}
          <RecentOrdersChart/>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <TopProducts />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <OfferProducts />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <RecentOrder />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <RecentProduct />
        </Col>
      </Row>

    </div>
  );
};

export default HomeAdmin;
