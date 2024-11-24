import {
  Button,
  Col,
  Popconfirm,
  Row,
  Select,
  Table,
  TableColumnsType,
} from "antd";
import {
  useDeleteBuyerMutation,
  useGetBuyersQuery,
} from "../../../../redux/features/buyer/buyerApi";
import Loader from "../../../shared/loader/Loader";
import PageTitle from "../../../shared/PageTitle/PageTitle";
import { TBuyer } from "../../../../types/buyer.types";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { toast } from "sonner";

const { Option } = Select;
const AllBuyer = () => {
  const [pageSize, setPageSize] = useState(10);
  const [deleteBuyer] = useDeleteBuyerMutation();
  const { data: buyersData, isLoading: buyerDataLoading } = useGetBuyersQuery(
    {}
  );
  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
  };

  const dataTable = buyersData?.data?.map(
    ({ _id, id, name, contactNo, email, city, profileImg, user }: TBuyer) => ({
      key: _id,
      id,
      name,
      contactNo,
      email,
      profileImg,
      city,
      user,
    })
  );

  const handleDeleteBuyer = async (buyerId: string) => {
    const res = await deleteBuyer(buyerId);
    console.log(res, "res", buyerId);
    if (res?.data?.success) {
      toast.success("Delete buyer successfully!", {
        duration: 1000,
        position: "top-right",
      });
    } else {
      toast.error("Cannot delete buyer!");
      console.log("Cannot delete buyer!");
    }
  };

  const columns: TableColumnsType<TBuyer> = [
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
          <span>{item.name}</span>
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
      width: 120,
    },
    {
      title: "City",
      dataIndex: "city",
      key: "cigy",
      align: "center",
      width: 120,
    },
    {
      title: "Status",
      dataIndex: "user",
      key: "status",
      align: "center",
      render: (user) =>
        user.status === "active" ? (
          <div
            style={{
              backgroundColor: "green",
              color: "white",
              borderRadius: "5px",
              padding: "1px 5px",
            }}
          >
            {user.status}
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
            {user.status}
          </div>
        ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (buyer) => {
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
              onConfirm={() => handleDeleteBuyer(buyer.key)}
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
      <PageTitle pageTitle="Buyer List || Admin" />
      <div className="pt-4 px-4 d-flex justify-content-between align-items-center">
        <h5 className="fw-bold side-header">
          All Buyer List ({buyersData?.data?.length})
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
      {buyerDataLoading ? (
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

export default AllBuyer;
