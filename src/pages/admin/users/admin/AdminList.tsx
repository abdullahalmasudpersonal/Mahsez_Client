import Loader from "@/pages/shared/loader/Loader";
import PageTitle from "@/pages/shared/PageTitle/PageTitle";
import { useGetAdminsQuery } from "@/redux/features/admin/adminApi";
import { TAdmin } from "@/types/admin.types";
import { DeleteOutlined, EditOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, ConfigProvider, Popconfirm, Row, Select, Table, TableColumnsType } from "antd";
import { useState } from "react";

const { Option } = Select;
const AdminList = () => {
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const { data: adminsData, isLoading: adminDataLoading } = useGetAdminsQuery(
        {}
    );

    const handleTableChange = (page: number, pageSize: number) => {
        setCurrentPage(page);
        setPageSize(pageSize);
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
                    <Avatar src={item?.profileImg} size={50} style={{ backgroundColor: '#04334eff', border: '1px solid rgba(190, 190, 190, 1)', marginRight: '10px', boxShadow: "rgba(103, 115, 124, 0.89) 0px 1px 2px 0px, rgba(100, 109, 116, 0.62) 0px 1px 3px 1px", }} icon={<UserOutlined />} />
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
        <div>
            <PageTitle pageTitle="Admin List || Admin" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#1c6fc2ff', borderRadius: '5px 5px 0 0' }}>
                <h5 style={{ color: 'white', margin: "0", fontWeight: '700' }}>
                    All Admin List ({adminsData?.data?.length})
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
            {adminDataLoading ? (
                <Loader />
            ) : (
                <div style={{ paddingTop: '20px' }}>
                    <ConfigProvider theme={{ components: { Table: { headerBorderRadius: 0, } } }}>
                        <Table
                            columns={columns}
                            dataSource={dataTable}
                            pagination={{
                                pageSize: pageSize,
                                current: currentPage,
                                total: adminsData?.meta?.total,
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

export default AdminList;