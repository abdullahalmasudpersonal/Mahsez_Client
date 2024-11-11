import {
  Button,
  Col,
  Popconfirm,
  Row,
  Select,
  Table,
  TableColumnsType,
} from "antd";
import PageTitle from "../../../shared/PageTitle/PageTitle";
import { useState } from "react";
import { useGetAllOrderQuery } from "../../../../redux/features/order/orderApi";
import { TOrder } from "../../../../types/order.types";
import Loader from "../../../shared/loader/Loader";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

const { Option } = Select;

const ListOrders = () => {
  const [pageSize, setPageSize] = useState(10);
  const { data: orderData, isLoading: orderDataLoading } = useGetAllOrderQuery(
    {}
  );

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
  };

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Dhaka",
    };
    return date.toLocaleDateString("en-US", options);
  }

  const dataTable = orderData?.data?.map(
    ({
      _id,
      name,
      orderId,
      createdAt,
      contactNumber,
      grandTotal,
      paymentStatus,
      items,
      orderStatus,
      paymentType,
    }: TOrder) => ({
      key: _id,
      name,
      orderId,
      createdAt,
      contactNumber,
      grandTotal,
      paymentStatus,
      items,
      orderStatus,
      paymentType,
    })
  );

  const columns: TableColumnsType<TOrder> = [
    {
      title: "Order ID",
      key: "orderId",
      dataIndex: "orderId",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      align: "center",

      render: (createdAt: string) => formatDate(createdAt),
    },
    {
      title: "Coustomer",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Amount",
      dataIndex: "grandTotal",
      key: "grandTotal",
      align: "center",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      align: "center",
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      key: "paymentType",
      align: "center",
    },
    {
      title: "Contact Number ",
      dataIndex: "contactNumber",
      key: "contactNumber",
      align: "center",
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      align: "center",
      width: 80,
      render: (items) => items?.length,
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      align: "center",
      width: 80,
    },
    {
      title: "Action",
      key: "category",
      align: "center",
      width: 80,
      render: () => {
        return (
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <Button color="primary" variant="filled">
              <EyeOutlined />
            </Button>
            <Button
              variant="filled"
              style={{
                backgroundColor: "#FFF8DC",
                border: "none",
              }}
            >
              <EditOutlined style={{ color: "#FFA500" }} />
            </Button>

            <Popconfirm
              title="Are you sure you want to delete this product?"
              // onConfirm={() => deleteProduct(item?.key)}
              okText="Yes"
              cancelText="No"
            >
              <Button color="danger" variant="filled">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <div className="dashboard-dev2" style={{ overflowX: "auto" }}>
      <PageTitle pageTitle="Order List || Admin" />
      <div className="pt-4 px-4 d-flex justify-content-between align-items-center">
        <h4 className="fw-bold side-header">
          All Order List ({orderData?.data?.length})
        </h4>
        <Row justify="end">
          <Col>
            <Select
              defaultValue={10}
              style={{ width: 120 }}
              onChange={handlePageSizeChange}
            >
              <Option value={10}>10 / page</Option>
              <Option value={20}>20 / page</Option>
              <Option value={30}>30 / page</Option>
              <Option value={50}>50 / page</Option>
            </Select>
          </Col>
        </Row>
      </div>
      <hr />
      {orderDataLoading ? (
        <Loader />
      ) : (
        <div style={{ padding: "10px" }}>
          <Table
            columns={columns}
            dataSource={dataTable}
            pagination={{
              position: ["bottomRight"],
              pageSize: pageSize,
              showSizeChanger: false,
            }}
            scroll={{ x: true, y: 500 }}
            style={{ width: "100%" }}
            sticky
          />
        </div>
      )}
    </div>
  );
};

export default ListOrders;
