import { useState } from "react";
import { Row, Col, Card, Typography, Space, Dropdown } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  MoreOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const AdminCart = () => {
  // const [orderFilter, setOrderFilter] = useState("1");
  // const [amountFilter, setAmountFilter] = useState("1");
  // const [visitorFilter, setVisitorFilter] = useState("1");
  // const [revenueFilter, setRevenueFilter] = useState("1");

  const filters = [
    { key: "1", label: "Today" },
    { key: "7", label: "Last Week" },
    { key: "30", label: "Last Month" },
    { key: "365", label: "Current Year" },
  ];

  const [, /* selectedFilters */ setSelectedFilters] = useState({
    revenue: "1",
    orders: "1",
    growth: "1",
    conversion: "1",
  });

  const handleMenuClick = (key: string, filter: string) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: filter }));
  };

  const cardsData = [
    {
      key: "orders",
      title: "Orders",
      value: "$6523",
      trend: "up",
      percentage: "+3.45%",
      description: "from last week",
      image: "https://cdn-icons-png.flaticon.com/128/5444/5444712.png",
      gradient:
        "linear-gradient(109.6deg, rgb(255, 194, 48) 11.2%, rgb(255, 124, 0) 100.2%)",
    },
    {
      key: "Amount",
      title: "Profit",
      value: "$6523",
      trend: "down",
      percentage: "+3.45%",
      description: "from last week",
      image: "https://cdn-icons-png.flaticon.com/128/1013/1013401.png",
      gradient:
        "radial-gradient(circle at 10% 20%, rgb(228, 118, 0) 0%, rgb(247, 189, 2) 90%)",
    },
    {
      key: "Revinew",
      title: "Revinew",
      value: "$6523",
      trend: "down",
      percentage: "+3.45%",
      description: "from last week",
      image: "https://cdn-icons-png.flaticon.com/128/584/584558.png",
      gradient:
        "linear-gradient(109.6deg, rgb(255, 194, 48) 11.2%, rgb(255, 124, 0) 100.2%)",
    },
    {
      key: "Visitors",
      title: "Visitors",
      value: "$6523",
      trend: "up",
      percentage: "+3.45%",
      description: "from last week",
      image: "https://cdn-icons-png.flaticon.com/128/681/681494.png",
      gradient:
        "radial-gradient(circle at 10% 20%, rgb(255, 131, 61) 0%, rgb(249, 183, 23) 90%)",
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        {cardsData.map((card) => (
          <Col xs={24} sm={24} md={12} lg={6}>
            <Card
              style={{
                borderRadius: "10px",
                backgroundImage: card.gradient,
                color: "black",
                // boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Space
                direction="vertical"
                size="small"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Space
                  align="center"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        backgroundColor: "rgba(243, 243, 243, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={card.image}
                        alt="icon"
                        style={{
                          width: "22px",
                          height: "22px",
                        }}
                      />
                    </div>
                    <Title level={5} style={{ margin: " 0", color: "#fff" }}>
                      {card.title}
                    </Title>
                  </div>

                  <Dropdown
                    placement="bottomRight"
                    menu={{
                      items: filters.map((filter) => ({
                        key: filter.key,
                        label: (
                          <span
                            onClick={() =>
                              handleMenuClick("cardKey", filter.key)
                            }
                          >
                            {filter.label}
                          </span>
                        ),
                      })),
                    }}
                    trigger={["click"]}
                  >
                    <MoreOutlined
                      style={{
                        fontSize: "18px",
                        cursor: "pointer",
                        color: "#fff",
                      }}
                    />
                  </Dropdown>
                </Space>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "end",
                  }}
                >
                  <Title level={3} style={{ margin: "0", color: "#fff" }}>
                    {card.value}
                  </Title>

                  <Space
                    align="center"
                    style={{ display: "grid", justifyItems: "end", gap: "0" }}
                  >
                    <Typography>
                      {card.trend === "up" ? (
                        <ArrowUpOutlined style={{ color: "lightgreen" }} />
                      ) : (
                        <ArrowDownOutlined style={{ color: "red" }} />
                      )}
                      <Text
                        style={{
                          color: card.trend === "up" ? "lightgreen" : "red",
                        }}
                      >
                        {card.percentage}
                      </Text>
                    </Typography>
                    <Typography style={{ color: "#fff" }}>
                      {card.description}
                    </Typography>
                  </Space>
                </div>
              </Space>
            </Card>
          </Col>
        ))}
        {/*  <Col xs={24} sm={24} md={12} lg={6}>
          <Card hoverable></Card>
        </Col> */}
        {/* <Col xs={24} sm={24} md={12} lg={6}>
          <Card hoverable> </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Card hoverable></Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Card hoverable></Card>
        </Col> */}
      </Row>
    </div>
  );
};

export default AdminCart;
