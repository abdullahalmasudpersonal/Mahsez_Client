// import "./AllOrderDetail.css";
// import { useParams } from "react-router-dom";
// import { useGetSingleOrderQuery } from "../../../../redux/features/order/orderApi";
// import PageTitle from "../../../shared/PageTitle/PageTitle";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "antd";

const OrderDetails = () => {
  //   const { orderId } = useParams();
  //   const { data: orderDetails } = useGetSingleOrderQuery(orderId);
  //   const {
  //     orderId: orderNo,
  //     name,
  //     email,
  //     paymentType,
  //     orderStatus,
  //     district,
  //     address,
  //     comment,
  //     contactNumber,
  //     subTotal,
  //     grandTotal,
  //     deliveryCharge,
  //     paymentNumber,
  //   } = orderDetails?.data || {};
  return (
    <>
      <div className="dashboard-dev2" style={{ padding: "10px" }}>
        <Row
          gutter={[16, 16]} // দুই ডিভের মধ্যে ফাঁকা
          justify="center" // কেন্দ্রীয়ভাবে সাজানো
        >
          {/* প্রথম ডিভ */}
          <Col
            xs={24} // ছোট ডিভাইসে পুরো প্রস্থ নেবে
            md={24} // মাঝারি ডিভাইসে 10 ভাগের 7 ভাগ
            lg={16}
            style={{
              backgroundColor: "#f0a2f5",
              textAlign: "center",
            }}
          >
            <Row
              justify="center"
              style={{ width: "100%", textAlign: "center" }}
            >
              <Col
                xs={24} // ছোট ডিভাইসে পুরো প্রস্থ নেবে
                md={12} // মাঝারি ডিভাইসে 10 ভাগের 7 ভাগ
                lg={12}
                style={{
                  backgroundColor: "#f0f2d5",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                প্রথম ডিভ 1.1 (৭/১০ প্রস্থ)
              </Col>
              <Col
                xs={24} // ছোট ডিভাইসে পুরো প্রস্থ নেবে
                md={12} // মাঝারি ডিভাইসে 10 ভাগের 7 ভাগ
                lg={12}
                style={{
                  backgroundColor: "#f0f2f5",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                প্রথম ডিভ 1.2 (৭/১০ প্রস্থ)
              </Col>
            </Row>
          </Col>

          {/* দ্বিতীয় ডিভ */}
          <Col
            xs={24} // ছোট ডিভাইসে পুরো প্রস্থ নেবে
            md={24} // মাঝারি ডিভাইসে 10 ভাগের 3 ভাগ
            lg={8}
            style={{
              backgroundColor: "#d9f7be",
              padding: "20px",
              textAlign: "center",
            }}
          >
            দ্বিতীয় ডিভ (৩/১০ প্রস্থ)
          </Col>
        </Row>
      </div>
    </>
  );
};

export default OrderDetails;
