import Loader from "@/pages/shared/loader/Loader";
import PageTitle from "@/pages/shared/PageTitle/PageTitle";
import { useDeleteBuyerMutation, useGetBuyersQuery } from "@/redux/features/buyer/buyerApi";
import { TBuyer } from "@/types/buyer.types";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Col, ConfigProvider, Popconfirm, Row, Select, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const { Option } = Select;
const BuyerList = () => {
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteBuyer] = useDeleteBuyerMutation();
    const { data: buyersData, isLoading: buyerDataLoading, refetch, } = useGetBuyersQuery({
        pollingInterval: 2000,
        skipPollingIfUnfocused: true,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            refetch();
        }, 2000);
        return () => clearInterval(interval);
    }, [refetch]);

    const handleTableChange = (page: number, pageSize: number) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const handleDeleteBuyer = async (buyerId: string) => {
        const res = await deleteBuyer(buyerId);

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

    const dataTable = buyersData?.data?.map(
        ({
            _id,
            id,
            name,
            contactNo,
            email,
            city,
            profileImg,
            user,
            onlineStatus,
        }: TBuyer) => ({
            key: _id,
            id,
            name,
            contactNo,
            email,
            profileImg,
            city,
            user,
            onlineStatus,
        })
    );

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
                user?.status === "active" ? (
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
                        {user?.status}
                    </div>
                ),
        },
        /*   {
          title: "Online Status",
          dataIndex: "onlineStatus",
          key: "onlineStatus",
          align: "center",
          render: (onlineStatus) =>
            onlineStatus === "online" ? (
              <div
                style={{
                  backgroundColor: "green",
                  color: "white",
                  borderRadius: "5px",
                  padding: "1px 5px",
                }}
              >
                {onlineStatus}
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
                {onlineStatus}
              </div>
            ),
        }, */
        {
            title: "Online Status",
            dataIndex: "user",
            key: "user",
            align: "center",
            render: (user) =>
                user?.isOnline ? (
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
        <div>
            <PageTitle pageTitle="Buyer List || Admin" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#1c6fc2ff', borderRadius: '5px 5px 0 0' }}>
                <h5 style={{ color: 'white', margin: "0", fontWeight: '700' }}>
                    All Buyer List ({buyersData?.data?.length})
                </h5>
                <Row>
                    <Col>
                        <Select
                            defaultValue={10}
                            style={{ width: 120 }}
                            onChange={(value) => setPageSize(value)}
                        >
                            <Option value={10}>10 / page</Option>
                            <Option value={20}>20 / page</Option>
                            <Option value={30}>30 / page</Option>
                            <Option value={50}>50 / page</Option>
                        </Select>
                    </Col>
                </Row>
            </div>
            {buyerDataLoading ? (
                <Loader />
            ) : (
                <div style={{ paddingTop: "20px" }}>
                    <ConfigProvider theme={{ components: { Table: { headerBorderRadius: 0, } } }}>
                        <Table
                            columns={columns}
                            dataSource={dataTable}
                            pagination={{
                                pageSize: pageSize,
                                current: currentPage,
                                total: buyersData?.meta?.total,
                                onChange: handleTableChange,
                                showSizeChanger: false,
                            }}
                            scroll={{ x: "max-content", y: 570 }}
                            style={{ width: "100%" }}
                            sticky
                        />
                    </ConfigProvider>
                </div>
            )}
        </div>
    );
};

export default BuyerList;