import { useGetAdminsQuery } from "../../../../redux/features/admin/adminApi";
import {
  Button,
  Col,
  Popconfirm,
  Row,
  Select,
  Table,
  TableColumnsType,
} from "antd";
import Loader from "../../../shared/loader/Loader";
import PageTitle from "../../../shared/PageTitle/PageTitle";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { TAdmin } from "../../../../types/admin.types";

const { Option } = Select;
const AllAdmin = () => {
  const [pageSize, setPageSize] = useState(10);
  const { data: adminsData, isLoading: adminDataLoading } = useGetAdminsQuery(
    {}
  );
  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
  };

  const dataTable = adminsData?.data?.map(
    ({
      _id,
      id,
      name,
      contactNo,
      email,
      city,
      profileImg,
      status,
      onlineStatus,
      isOnline,
    }: TAdmin) => ({
      key: _id,
      id,
      name,
      contactNo,
      email,
      profileImg,
      city,
      status,
      onlineStatus,
      isOnline,
    })
  );

  const columns: TableColumnsType<TAdmin> = [
    {
      title: "Name",
      key: "name",
      render: (item) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={item.profileImg}
            alt="buyer image"
            style={{
              width: "50px",
              height: "55px",
              marginRight: "10px",
              borderRadius: "5px",
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
            }}
          />
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/blog/${item.key}`}
          >
            <span>{item.name}</span>
          </Link>
        </div>
      ),
    },
    {
      title: "UserId",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "ContactNo",
      dataIndex: "contactNo",
      key: "contactNo",
      align: "center",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "cigy",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) =>
        status === "active" ? (
          <div
            style={{
              backgroundColor: "green",
              color: "white",
              borderRadius: "5px",
              padding: "1px 5px",
            }}
          >
            {status}
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "red",
              color: "white",
              borderRadius: "5px",
              padding: "1px 5px",
            }}
          >
            {status}
          </div>
        ),
    },
    // {
    //   title: "Online Status",
    //   dataIndex: "onlineStatus",
    //   key: "onlineStatus",
    //   align: "center",
    //   render: (status) =>
    //     status === "online" ? (
    //       <div
    //         style={{
    //           backgroundColor: "green",
    //           color: "white",
    //           borderRadius: "5px",
    //           padding: "1px 5px",
    //         }}
    //       >
    //         {status}
    //       </div>
    //     ) : (
    //       <div
    //         style={{
    //           backgroundColor: "red",
    //           color: "white",
    //           borderRadius: "5px",
    //           padding: "1px 5px",
    //         }}
    //       >
    //         {status}
    //       </div>
    //     ),
    // },
    {
      title: "Online Status",
      dataIndex: "isOnline",
      key: "isOnline",
      align: "center",
      render: (isOnline) =>
        isOnline ? (
          <div
            style={{
              backgroundColor: "green",
              color: "white",
              borderRadius: "5px",
              padding: "1px 5px",
            }}
          >
            Online
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "red",
              color: "white",
              borderRadius: "5px",
              padding: "1px 5px",
            }}
          >
            Offline
          </div>
        ),
    },
    {
      title: "Action",
      key: "category",
      align: "center",
      render: () => {
        return (
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            {/* <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/blog/${blog.key}`}
            > */}
            <Button color="primary" variant="filled">
              <EyeOutlined />
            </Button>
            {/* </Link> */}
            <Button
              //   onClick={() => navigateToEditBlog(blog?.key)}
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
              //   onConfirm={() => handleDeleteBlog(blog?.key)}
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
      <PageTitle pageTitle="Admin List || Admin" />
      <div className="pt-4 px-4 d-flex justify-content-between align-items-center">
        <h5 className="fw-bold side-header">
          All Admin List ({adminsData?.data?.length})
        </h5>
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
      {adminDataLoading ? (
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
            scroll={{ x: "max-content", y: 500 }}
            style={{ width: "100%" }}
            sticky
          />
        </div>
      )}
    </div>
  );
};

export default AllAdmin;
