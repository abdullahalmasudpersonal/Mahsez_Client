import Loader from "@/pages/shared/loader/Loader";
import PageTitle from "@/pages/shared/PageTitle/PageTitle";
import { useGetAllOrderQuery } from "@/redux/features/order/orderApi";
import { TOrder } from "@/types/order.types";
import { formatDate } from "@/utils/formatDate";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Col, ConfigProvider, Popconfirm, Row, Select, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const { Option } = Select;

const OrderList = () => {
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const { data: orderData, isLoading: orderDataLoading } = useGetAllOrderQuery(
        {}
    );

    const handleTableChange = (page: number, pageSize: number) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

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
            width: 110,
            render: (createdAt: string) => formatDate(createdAt),
        },
        {
            title: "Coustomer",
            dataIndex: "name",
            key: "name",
            align: "center",
            width: 150,
        },
        {
            title: "Amount",
            dataIndex: "grandTotal",
            key: "grandTotal",
            align: "center",
            width: 100,
        },
        {
            title: "Payment Status",
            dataIndex: "paymentStatus",
            key: "paymentStatus",
            align: "center",
            width: 150,
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
            width: 100,
            render: (items) => items?.length,
        },
        {
            title: "Order Status",
            dataIndex: "orderStatus",
            key: "orderStatus",
            align: "center",
        },
        {
            title: "Action",
            key: "category",
            align: "center",
            render: (item) => {
                return (
                    <div
                        style={{ display: "flex", justifyContent: "center", gap: "10px" }}
                    >
                        <Link to={`/admin/order-details/${item.key}`}>
                            <Button color="primary" variant="filled">
                                <EyeOutlined />
                            </Button>
                        </Link>
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
        <div style={{ flex: 1 }}>
            <PageTitle pageTitle="Order List || Admin" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#1c6fc2ff', borderRadius: '5px 5px 0 0' }}>
                <h5 style={{ color: 'white', margin: "0", fontWeight: '700' }}>
                    All Order List ({orderData?.data?.length})
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
            {orderDataLoading ? (
                <Loader />
            ) : (
                <div style={{ paddingTop: '20px', }}>  <ConfigProvider theme={{ components: { Table: { headerBorderRadius: 0, } } }}>
                    <Table
                        columns={columns}
                        dataSource={dataTable}
                        pagination={{
                            pageSize: pageSize,
                            current: currentPage,
                            total: orderData?.meta?.total,
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

export default OrderList;